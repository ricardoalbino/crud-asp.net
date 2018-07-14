using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudAjax.Models
{
    public class PessoaModel
    {
        //  Propriedades
        public int PessoaID { get; set; }

        public string Nome { get; set; }

        public int Idade { get; set; }

        public string Estado { get; set; }

        public string Pais { get; set; }
    }
}