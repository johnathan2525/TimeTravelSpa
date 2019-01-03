using System;
using System.Collections.Generic;

namespace TimeTravelSpa.ViewModels
{
    public class TransporterViewModel
    {


        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<int> Passengers { get; set; }
    
    }
}
