using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace TimeTravelSpa.Models
{
    public static class SeedData
    {

        public static async void Initialize(IServiceProvider serviceProvider)
        {

            using (var context = new TimeTravelContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<TimeTravelContext>>()))
            {


                if (!context.Transporters.Any())
                {
                    var transporter = new Transporter
                    {
                        Name = "DeLorean"
                    };    
                    context.Transporters.Add(transporter);


                    transporter = new Transporter
                    {
                        Name = "Phone Booth"
                    };
                    context.Transporters.Add(transporter);

                    await context.SaveChangesAsync();

                }


                if (!context.Passengers.Any())
                {
                    var passenger = new Passenger
                    {
                        Name = "Marty McFly",
                        PositionInTime = new DateTime(2015, 10, 21),
                        Destination = "Hill Valley",
                        Transporter = context.Transporters.FirstOrDefault()
                    };
                    context.Passengers.Add(passenger);

                    passenger = new Passenger
                    {
                        Name = "Emmett Brown",
                        PositionInTime = new DateTime(1885, 9, 2),
                        Destination = "Old West",
                        Transporter = context.Transporters.FirstOrDefault()
                    };
                    context.Passengers.Add(passenger);

                    passenger = new Passenger
                    {
                        Name = "Jennifer Parker",
                        PositionInTime = new DateTime(1985, 7, 3),
                        Destination = "The 80s",
                        Transporter = context.Transporters.FirstOrDefault()
                    };
                    context.Passengers.Add(passenger);

                    var phoneBooth = await (from c in context.Transporters
                                    where c.Name == "Phone Booth"
                                    select c).SingleAsync();

                    passenger = new Passenger
                    {
                        Name = "Bill S. Preston, Esquire",
                        PositionInTime = new DateTime(1985, 7, 3),
                        Destination = "The 80s",
                        TransporterId = phoneBooth.Id
                    };
                    context.Passengers.Add(passenger);

                    passenger = new Passenger
                    {
                        Name = "Ted 'Theodore' Logan",
                        PositionInTime = new DateTime(1985, 7, 3),
                        Destination = "The 80s",
                        TransporterId = phoneBooth.Id
                    };
                    context.Passengers.Add(passenger);

                    await context.SaveChangesAsync();
                }
            }

        }

    }
}
