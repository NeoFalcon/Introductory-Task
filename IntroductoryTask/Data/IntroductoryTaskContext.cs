using IntroductoryTask.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace IntroductoryTask.Data
{
	public class IntroductoryTaskContext : DbContext
	{
		public IntroductoryTaskContext(DbContextOptions<IntroductoryTaskContext> options)
			: base(options)
		{
			Database.Migrate();
		}

		public DbSet<Payment> tblPayments { get; set; }
	}
}
