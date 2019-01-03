using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TimeTravelSpa.Models
{
    public class Passenger
    {

        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Display(Name = "Position In Time")]
        [Required]
        [DataType(DataType.Date)]
        public DateTime PositionInTime { get; set; }

        [Required]
        public string Destination { get; set; }

        [Display(Name = "Transporter")]
        [ForeignKey("Transporter")]
        public int? TransporterId { get; set; }
        public Transporter Transporter { get; set; }
        
    }
}
