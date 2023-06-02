using BookmarksMay30.Data;
using BookmarksMay30.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookmarksMay30.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarkController : ControllerBase
    {

        private readonly string _connectionString;

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpPost]
        [Route("new")]
        public void NewBookmark(Bookmark b)
        {
            var repo = new Repository(_connectionString);
            repo.AddBookmark(b);
            
        }

        [HttpGet]
        [Route("getById")]
        public List<Bookmark> GetById(int id)
        {
            var repo = new Repository(_connectionString);
            return repo.GetById(id);

        }

        [HttpPost]
        [Route("delete")]
        public void Delete(DeleteVM vm)
        {
            var repo = new Repository(_connectionString);
            repo.Delete(vm.Id);
        }

        [HttpPost]
        [Route("update")]
        public void Update(UpdateViewModel vm)
        {
            var repo = new Repository(_connectionString);
            repo.Update(vm.Name, vm.Id);
        }



        [HttpGet]
        [Route("getMostPopular")]
        public List<Object> GetMostPopular()
        {
            var repo = new Repository(_connectionString);
            return repo.GetMostPopular();
        }



    }
}
