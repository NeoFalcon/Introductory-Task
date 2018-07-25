using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using PaymillWrapper;
using System.Text;
using System.Threading.Tasks;

namespace IntroductoryTask.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]
	public class SubmitPaymentController : Controller
    {
		[HttpPost("[action]")]
		public async Task<string> Save([FromBody] string paymentToken)
        {
			if (ModelState.IsValid)
			{
				var paymillContext = new PaymillContext("337e3a54ea95ca8740e3dc035ee02172");
				var paymentService = paymillContext.PaymentService;
				var payment = await paymentService.CreateWithTokenAsync(paymentToken);
				
				return string.Empty;
			}

			return FormatValidationErrors(ModelState.Values);
		}

		private string FormatValidationErrors(ModelStateDictionary.ValueEnumerable modelStateValues)
		{
			var result = new StringBuilder();
			foreach (var value in modelStateValues)
			{
				foreach (var error in value.Errors)
				{
					result.Append(error.ErrorMessage);
					result.Append(". ");
				}
			}

			return result.ToString();
		}
	}
}