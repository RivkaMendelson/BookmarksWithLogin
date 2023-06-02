using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace BookmarksMay30.Data
{
    public class BookmarksDBContextFactory : IDesignTimeDbContextFactory<BookmarksDBContext>
    {
        public BookmarksDBContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}BookmarksMay30.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new BookmarksDBContext(config.GetConnectionString("ConStr"));
        }
    }
}
