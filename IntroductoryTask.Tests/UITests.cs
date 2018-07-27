using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using Xunit;

namespace IntroductoryTask.Tests
{
	public class UITests
    {
		[Fact]
		public void UITests_WithFirefoxDriver_ReturnsElements()
		{
			using (var driver = new FirefoxDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
			{
				UITests_ReturnsElements(driver);
			}
		}

		[Fact]
		public void UITests_WithChromeDriver_ReturnsElements()
		{
			using (var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
			{
				UITests_ReturnsElements(driver);
			}
		}

		private void UITests_ReturnsElements(RemoteWebDriver driver)
		{
			driver.Navigate().GoToUrl(@"https://introductorytask.azurewebsites.net/");
			var mainWindowHandle = driver.CurrentWindowHandle;
			var facebookButton = driver.FindElement(By.CssSelector("iframe[title='fb:login_button Facebook Social Plugin']"));
			facebookButton.Click();
			var facebookWindowHandle = driver.WindowHandles.FirstOrDefault(h => h != mainWindowHandle);
			driver.SwitchTo().Window(facebookWindowHandle);
			var emailInput = driver.FindElement(By.CssSelector("input[name='email'].inputtext._55r1.inputtext.inputtext"));
			emailInput.SendKeys("neofalcon@gmail.com");
			var passwordInput = driver.FindElement(By.CssSelector("input[name='pass'].inputtext._55r1.inputtext.inputtext"));
			passwordInput.SendKeys("24252425");
			var facebookLoginButton = driver.FindElement(By.CssSelector("input[name='login']#u_0_0"));
			facebookLoginButton.Click();
			if (driver.WindowHandles.Any(h => h == facebookWindowHandle))
			{
				var facebookOkButton = driver.FindElement(By.CssSelector("button._42ft._4jy0.layerConfirm._1fm0._51_n.autofocus._4jy3._4jy1.selected._51sy"));
				facebookOkButton.Click();
			}
			driver.SwitchTo().Window(mainWindowHandle);
			Assert.Equal(@"https://introductorytask.azurewebsites.net/submitpayment", driver.Url);

			driver.Navigate().GoToUrl(@"https://introductorytask.azurewebsites.net/");
			Thread.Sleep(5000);
			Assert.Equal(@"https://introductorytask.azurewebsites.net/submitpayment", driver.Url);

			var payNowButton = driver.FindElement(By.CssSelector("button[type='submit']"));
			ValidateNullitySuccessAlert(driver, payNowButton);

			var cardNumberInput = driver.FindElement(By.CssSelector("input[name='cardNumber'"));
			var nameOnCardInput = driver.FindElement(By.CssSelector("input[name='nameOnCard'"));
			var expiryMonthInput = driver.FindElement(By.CssSelector("input[name='expiryMonth'"));
			var expiryYearInput = driver.FindElement(By.CssSelector("input[name='expiryYear'"));
			var securityCodeInput = driver.FindElement(By.CssSelector("input[name='securityCode'"));

			ValidateInput(driver, payNowButton, cardNumberInput, "card-number", "card-number-error", "411111111111111", "4111111111111112");
			ValidateInput(driver, payNowButton, cardNumberInput, "card-number", "card-number-error", "411111111111111t", "4111111111111112");
			ValidateNullitySuccessAlert(driver, payNowButton);

			ValidateInput(driver, payNowButton, nameOnCardInput, "name-on-card", "name-on-card-error", "T", "Test");
			ValidateNullitySuccessAlert(driver, payNowButton);

			ValidateInput(driver, payNowButton, expiryMonthInput, "expiry-month", "expiry-month-error", "0", DateTime.Today.Month.ToString());
			ValidateInput(driver, payNowButton, expiryMonthInput, "expiry-month", "expiry-month-error", "13", DateTime.Today.Month.ToString());
			ValidateNullitySuccessAlert(driver, payNowButton);

			ValidateInput(driver, payNowButton, expiryYearInput, "expiry-year", "expiry-year-error", "2017", (DateTime.Today.Year + 1).ToString());
			ValidateInput(driver, payNowButton, expiryYearInput, "expiry-year", "expiry-year-error", "201", (DateTime.Today.Year + 1).ToString());
			ValidateNullitySuccessAlert(driver, payNowButton);

			ValidateInput(driver, payNowButton, securityCodeInput, "security-code", "security-code-error", "0", "000");

			expiryYearInput.Clear();
			expiryYearInput.SendKeys(DateTime.Today.Year.ToString());
			ValidateInput(driver, payNowButton, "expiry-month", "expiry-month-error");
			ValidateNullitySuccessAlert(driver, payNowButton);

			if (DateTime.Today.Month < 12)
			{
				ValidateInput(driver, payNowButton, expiryMonthInput, "expiry-month", "expiry-month-error", DateTime.Today.Month.ToString(), "12");
			}
			else
			{
				expiryYearInput.Clear();
				expiryYearInput.SendKeys((DateTime.Today.Year + 1).ToString());
			}

			var formValidationErrors = driver.FindElement(By.CssSelector("span#form-validation-errors"));
			ValidateNullitySuccessAlert(driver, payNowButton);
			ValidateFormValidationErrors(driver, false);

			cardNumberInput.SendKeys("4111111111111111");
			nameOnCardInput.SendKeys("Test");
			expiryMonthInput.SendKeys("12");
			expiryYearInput.SendKeys((DateTime.Today.Year + 1).ToString());
			securityCodeInput.SendKeys("000");
			ValidateNullitySuccessAlert(driver, payNowButton, true);
			ValidateFormValidationErrors(driver, true);
		}

		private void ValidateFormValidationErrors(RemoteWebDriver driver, bool isValid)
		{
			var formValidationErrors = driver.FindElement(By.CssSelector("span#form-validation-errors"));
			if (isValid)
			{
				Assert.Equal(string.Empty, formValidationErrors.Text);
			}
			else
			{
				Assert.Matches(".+", formValidationErrors.Text);
			}
		}

		private void ValidateNullitySuccessAlert(RemoteWebDriver driver, IWebElement payNowButton)
		{
			ValidateNullitySuccessAlert(driver, payNowButton, false);
		}

		private void ValidateNullitySuccessAlert(RemoteWebDriver driver, IWebElement payNowButton, bool doesExist)
		{
			payNowButton.Click();
			var successAlert = driver.FindElements(By.CssSelector("div.alert.alert-success.alert-dismissible"));
			if (doesExist)
			{
				Assert.NotEmpty(successAlert);
			}
			else
			{
				Assert.Empty(successAlert);
			}
		}

		private void ValidateInput(RemoteWebDriver driver, IWebElement payNowButton, string formElementId, string errorsId)
		{
			ValidateInput(driver, payNowButton, null, formElementId, errorsId, null, null);
		}

		private void ValidateInput(RemoteWebDriver driver, IWebElement payNowButton, IWebElement formInput, string formElementId, string errorsId, string invalidTextValue, string validTextValue)
		{
			var formElement = driver.FindElement(By.CssSelector($"div#{formElementId}"));
			var errors = driver.FindElement(By.CssSelector($"span#{errorsId}"));
			if (formInput != null)
			{
				formInput.Clear();
				formInput.SendKeys(invalidTextValue);
			}
			
			Assert.Contains("has-error", formElement.GetAttribute("class"));
			Assert.Matches(".+", errors.Text);
			Assert.NotNull(payNowButton.GetAttribute("disabled"));

			if (formInput != null)
			{
				formInput.Clear();
				formInput.SendKeys(validTextValue);
				Assert.DoesNotContain("has-error", formElement.GetAttribute("class"));
				Assert.Equal(string.Empty, errors.Text);
				Assert.Null(payNowButton.GetAttribute("disabled"));
			}
		}
	}
}
