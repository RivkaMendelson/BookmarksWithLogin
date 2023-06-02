using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BookmarksMay30.Data
{
    public class Bookmark
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SiteUrl { get; set; }

        public int UsersId { get; set; }
    }
}
