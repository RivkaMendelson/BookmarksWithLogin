using BookmarksMay30.Data;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace BookmarksMay30.Data
{
    public class Repository
    {
        private readonly string _connectionString;

        public Repository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddUser(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new BookmarksDBContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            return user;

        }

        public User GetByEmail(string email)
        {
            using var ctx = new BookmarksDBContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }

        public void AddBookmark(Bookmark b)
        {
            using var ctx = new BookmarksDBContext(_connectionString);
            ctx.Bookmarks.Add(b);
            ctx.SaveChanges();
        }


        public List<Bookmark> GetById(int id)
        {
            using var ctx = new BookmarksDBContext(_connectionString);
            return ctx.Bookmarks.Where(b => b.UsersId == id).ToList();
        }

        public void Delete(int id)
        {
            using var ctx = new BookmarksDBContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }

        public void Update(string name, int id)
        {
            using var ctx = new BookmarksDBContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"UPDATE Bookmarks set Name={name} WHERE Id = {id}");
        }

        public List<object> GetMostPopular()
        {
            using var context = new BookmarksDBContext(_connectionString);

            var topBookmarks = context.Bookmarks
                .GroupBy(b => b.SiteUrl)
                .Select(group => new
                {
                    Bookmark = group.First().SiteUrl,
                    Count = group.Count()
                })
                .OrderByDescending(group => group.Count)
                .Take(5)
                .ToList();

            return topBookmarks.Select(group => new
            {
                group.Bookmark,
                group.Count
            })
            .Cast<object>()
            .ToList();
        }

        //public List<MostPopularViewModel> GetMostPopular()
        //{
        //    using var ctx = new BookmarksDBContext(_connectionString);
        //    List<MostPopularViewModel> result= ctx.Database.ExecuteSqlInterpolated($"select top 5 count(*) as 'count', SiteURL from Bookmarks group by siteURL order by count desc");
        //    return result;

        //}
    }
}

