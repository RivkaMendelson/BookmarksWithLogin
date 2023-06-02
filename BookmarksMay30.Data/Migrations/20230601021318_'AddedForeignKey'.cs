using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookmarksMay30.Data.Migrations
{
    public partial class AddedForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Bookmarks",
                newName: "UsersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "Bookmarks",
                newName: "UserId");
        }
    }
}
