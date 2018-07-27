using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Edge;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using Xunit;

namespace IntroductoryTask.Tests
{
	public class LoginRegistrationTests
    {
		[Fact]
		public void TestWithFirefoxDriver()
		{
			using (var driver = new FirefoxDriver())
			{
				LoginRegistration_ReturnsElements(driver);
			}
		}
		[Fact]
		public void TestWithEdgeDriver()
		{
			using (var driver = new EdgeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
			{
				LoginRegistration_ReturnsElements(driver);
			}
		}
		[Fact]
		public void TestWithChromeDriver()
		{
			using (var driver = new ChromeDriver(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)))
			{
				LoginRegistration_ReturnsElements(driver);
			}
		}

		private void LoginRegistration_ReturnsElements(RemoteWebDriver driver)
		{
			driver.Navigate().GoToUrl(@"https://introductorytask.azurewebsites.net/");
			var mainWindowHandle = driver.CurrentWindowHandle;
			Thread.Sleep(5000);
			var facebookButton = driver.FindElement(By.CssSelector("div._5h0s"));
			if (facebookButton == null)
			{
				Assert.Equal(@"https://introductorytask.azurewebsites.net//submitpayment", driver.Url);
			}
			else
			{
				facebookButton.Click();
				var facebookWindowHandle = driver.WindowHandles.FirstOrDefault(h => h != mainWindowHandle);
				driver.SwitchTo().Window(facebookWindowHandle);
				var facebookOkButton = driver.FindElement(By.CssSelector("button._42ft._4jy0.layerConfirm.autofocus._4jy5._4jy1.selected._51sy"));
				facebookOkButton.Click();
				driver.SwitchTo().Window(mainWindowHandle);
				var overlay = driver.FindElement(By.CssSelector("div#splash-screen"));
				Assert.Equal("block", overlay.GetCssValue("display"));
			}
		}
	}
}
