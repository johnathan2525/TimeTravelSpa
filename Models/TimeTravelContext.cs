using System;
using Microsoft.EntityFrameworkCore;

namespace TimeTravelSpa.Models
{
    public class TimeTravelContext : DbContext
    {
        public TimeTravelContext(DbContextOptions<TimeTravelContext> options) : base(options) { }

        public virtual DbSet<Passenger> Passengers { get; set; }
        public virtual DbSet<Transporter> Transporters { get; set; }

    }
}
