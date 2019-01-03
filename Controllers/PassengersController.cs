using TimeTravelSpa.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;

namespace TimeTravelSpa.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [EnableCors("AllowAllOrigins")]
    public class PassengersController : ControllerBase
    {
        private readonly TimeTravelContext _db;

        public PassengersController(TimeTravelContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<List<Passenger>>> GetAllAsync()
        {
            return await _db.Passengers.AsNoTracking().Include("Transporter").ToListAsync();
        }


        [HttpGet("{id}")]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Passenger>> GetByIdAsync(int id)
        {
            var passenger = await _db.Passengers.FindAsync(id);

            if (passenger == null)
            {
                return NotFound();
            }

            if (passenger.TransporterId != null)
            {
                passenger.Transporter = await _db.Transporters.FindAsync(passenger.TransporterId);
            }

            return Ok(passenger);
        }


        // PUT: api/Passengers/5
        [HttpPut("{id}")]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Passenger>> UpdatePassengerAsync(int id, Passenger passenger)
        {
            if (id != passenger.Id)
            {
                return BadRequest();
            }

            _db.Entry(passenger).State = EntityState.Modified;
            await _db.SaveChangesAsync();
            return Ok(passenger);
        }

        // DELETE: api/Passengers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Passenger>> DeleteByIdAsync(int id)
        {
            var passenger = await _db.Passengers.FindAsync(id);
            if (passenger == null)
            {
                return NotFound();
            }

            _db.Passengers.Remove(passenger);
            await _db.SaveChangesAsync();
            return Ok(passenger);
        }

        [HttpPost]
        [ProducesResponseType(400)]
        public async Task<ActionResult<Passenger>> CreateAsync(Passenger passenger)
        {
            _db.Passengers.Add(passenger);
            await _db.SaveChangesAsync();
            return CreatedAtAction("GetByIdAsync", new {id = passenger.Id}, passenger);
        }
    }
}