using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace BookmarksMay30.Data
{
    public class BookmarksDBContext: DbContext
    {
        private readonly string _connectionString;

        public BookmarksDBContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        public DbSet<User> Users  { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }

    }
}
