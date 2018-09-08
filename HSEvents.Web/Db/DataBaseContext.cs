using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace HSEvents.Db
{
    public class DataBaseContextFactory : IDesignTimeDbContextFactory<DataBaseContext>
    {
        public DataBaseContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataBaseContext>();
            optionsBuilder.UseSqlServer(AppSettings.DefaultConnection, opts => opts.CommandTimeout(180));

            return new DataBaseContext(optionsBuilder.Options);
        }
    }

    public sealed class DataBaseContext : DbContext
    {
        //public DbSet<User> Users { get; set; }

        public DataBaseContext(DbContextOptions options) : base(options)
        {
            Database.Migrate();
        }
        private static void CreateDefaultUsers()
        {
            //if (!Users.Any())
            //{

            //}
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}