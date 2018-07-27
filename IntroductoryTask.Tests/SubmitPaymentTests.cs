using IntroductoryTask.Controllers;
using Xunit;

namespace IntroductoryTask.Tests
{
	public class SubmitPaymentTests
    {
		private readonly SubmitPaymentController _submitPaymentController;

		public SubmitPaymentTests()
		{
			_submitPaymentController = new SubmitPaymentController();
		}

        [Theory]
		[InlineData("Payment already exists", "tok_82739823287126hf5ulo85dehnmg")]
        public void Save_WithValidToken_ReturnsAlreadyExists(string expectedResult, string paymentToken)
        {
			var result = _submitPaymentController.Save(paymentToken).Result;
			Assert.Equal(expectedResult, result);
        }

		[Theory]
		[InlineData(159, "tok_82739823287126hf5ulo85dehnm")]
		public void Save_WithInvalidToken_ReturnsLongErrorMessage(int expectedMessageLength, string paymentToken)
		{
			var result = _submitPaymentController.Save(paymentToken).Result;
			Assert.Equal(expectedMessageLength, result.Length);
		}
	}
}
