using CrudAjax.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace CrudAjax.Dao
{
    public class PessoaDao
    {
        //string cs = ConfigurationManager.ConnectionStrings["CrudAjax"].ConnectionString;
        protected string cs { get; } = WebConfigurationManager.ConnectionStrings["CrudAjax"].ConnectionString;

        // Listar Tudo
        public List<PessoaModel> ListAll()
        {
            List<PessoaModel> lst = new List<PessoaModel>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand com = new SqlCommand("SelectPessoa", con);
                com.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = com.ExecuteReader();
                while (rdr.Read())
                {
                    lst.Add(new PessoaModel
                    {
                        PessoaID = Convert.ToInt32(rdr["PessoaId"]),
                        Nome = rdr["nome"].ToString(),
                        Idade = Convert.ToInt32(rdr["idade"]),
                        Estado = rdr["estado"].ToString(),
                        Pais = rdr["pais"].ToString(),
                    });
                }
                return lst;
            }
        }



        //Metodo para add nova pessoa
        public int Add(PessoaModel pessoaModel)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdatePessoa", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", pessoaModel.PessoaID);
                com.Parameters.AddWithValue("@Nome", pessoaModel.Nome);
                com.Parameters.AddWithValue("@Idade", pessoaModel.Idade);
                com.Parameters.AddWithValue("@Estado", pessoaModel.Estado);
                com.Parameters.AddWithValue("@Pais", pessoaModel.Pais);
                com.Parameters.AddWithValue("@Action", "Insert");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Metodo para alterar uma pessoa
        public int Update(PessoaModel pessoaModel)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("InsertUpdatePessoa", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", pessoaModel.PessoaID);
                com.Parameters.AddWithValue("@Nome", pessoaModel.Nome);
                com.Parameters.AddWithValue("@Idade", pessoaModel.Idade);
                com.Parameters.AddWithValue("@Estado", pessoaModel.Estado);
                com.Parameters.AddWithValue("@Pais", pessoaModel.Pais);
                com.Parameters.AddWithValue("@Action", "Update");
                i = com.ExecuteNonQuery();
            }
            return i;
        }

        //Metodo para deletar uma pessoa 
        public int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlCommand com = new SqlCommand("DeletePessoa", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();
            }
            return i;
        }
    }
}