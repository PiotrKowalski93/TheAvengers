//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Catering.API.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;

    public partial class Dish
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Dish()
        {
            this.OrderElement = new HashSet<OrderElement>();
        }
    
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Weight { get; set; }
    
        [JsonIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<OrderElement> OrderElement { get; set; }
    }
}
