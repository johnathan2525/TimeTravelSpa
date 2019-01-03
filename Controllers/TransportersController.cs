using TimeTravelSpa.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using TimeTravelSpa.ViewModels;

namespace TimeTravelSpa.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("AllowAllOrigins")]
    public class TransportersController : ControllerBase
    {
        private readonly TimeTravelContext _db;

        public TransportersController(TimeTravelContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransporterViewModel>>> GetAllAsync()
        {
            var transporters = await _db.Transporters.AsNoTracking().ToListAsync();

            var transporterViewModels = new List<TransporterViewModel>();

            foreach (var transporter in transporters)
            {
                var passengerIds = (from passenger in _db.Passengers
                    where passenger.TransporterId == transporter.Id
                    select passenger.Id).ToList();

                var transporterViewModel = new TransporterViewModel
                {
                    Id = transporter.Id,
                    Name = transporter.Name,
                    Passengers = passengerIds
                };
                transporterViewModels.Add(transporterViewModel);
            }

            return Ok(transporterViewModels);
        }


        [HttpGet("{id}")]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TransporterViewModel>> GetByIdAsync(int id)
        {
            var transporter = await _db.Transporters.FindAsync(id);

            if (transporter == null)
            {
                return NotFound();
            }

            var passengerIds = (from passenger in _db.Passengers
                where passenger.TransporterId == transporter.Id
                select passenger.Id).ToList();

            var transporterViewModel = new TransporterViewModel
            {
                Id = transporter.Id,
                Name = transporter.Name,
                Passengers = passengerIds
            };

            return Ok(transporterViewModel);
        }

        [HttpGet("{id}/passengers")]
        [ProducesResponseType(404)]
        public async Task<ActionResult<List<Passenger>>> GetPassengers(int id)
        {
            var transporter = await _db.Transporters.FindAsync(id);

            if (transporter == null)
            {
                return NotFound();
            }

            var passengers = (from passenger in _db.Passengers
                where passenger.TransporterId == transporter.Id
                select passenger).ToList();

            return Ok(passengers);
        }

        // PUT: api/Transporters/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TransporterViewModel>> UpdatePassengerAsync(int id,
            TransporterViewModel transporterViewModel)
        {
            if (id != transporterViewModel.Id)
            {
                return BadRequest();
            }

            var transporter = await _db.Transporters.FindAsync(id);

            if (transporter == null)
            {
                return NotFound();
            }

            ICollection<Passenger> passengers = new List<Passenger>();

            foreach (var passengerId in transporterViewModel.Passengers)
            {
                var passenger = await _db.Passengers.FindAsync(passengerId);
                if (passenger != null)
                {
                    passengers.Add(passenger);
                }
            }

            transporter.Passengers = passengers;

            _db.Entry(transporter).State = EntityState.Modified;

            await _db.SaveChangesAsync();

            return Ok(transporterViewModel);
        }
        
        
        // DELETE: api/Transporters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Transporter>> DeleteByIdAsync(int id)
        {
            var transporter = await _db.Transporters.FindAsync(id);
            if (transporter == null)
            {
                return NotFound();
            }

            _db.Transporters.Remove(transporter);
            await _db.SaveChangesAsync();
            return Ok(transporter);
        }

        [HttpPost]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Transporter>> CreateAsync(Transporter transporter)
        {
            _db.Transporters.Add(transporter);
            await _db.SaveChangesAsync();
            return Ok(transporter);
        }
        
        
    }
}