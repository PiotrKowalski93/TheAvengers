using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Catering.API.Models;
using Newtonsoft.Json;

namespace Catering.API.Controllers
{
    public class MenuController : ApiController
    {
        // GET: api/Menu
        public string Get()
        {
            string menuJson;

            using (CateringDatabaseEntities context = new CateringDatabaseEntities())
            {
                List<Dish>  menuItems = context.Dish.ToList();

                menuJson = JsonConvert.SerializeObject(menuItems);
            }
            
            return menuJson;
        }

        // GET: api/Menu/5
        public string Get(int id)
        {
            return "value";

            
        }

        // POST: api/Menu
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Menu/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Menu/5
        public void Delete(int id)
        {
        }
    }
}
