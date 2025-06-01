using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Data
{
    public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
    {
        public AppDbContext() { }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(CoreEventId.NavigationBaseIncludeIgnored));
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=ep-black-surf-a2mokz7p-pooler.eu-central-1.aws.neon.tech;Database=androidDB;Username=androidDB_owner;Password=npg_UpqjW8rGM7YI");
            }
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityUser>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }

        public DbSet<Category> Categories { get; set; }
    }
}