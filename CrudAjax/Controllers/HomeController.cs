using CrudAjax.Dao;
using CrudAjax.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudAjax.Controllers
{
    public class HomeController : Controller
    {

        PessoaDao pessoaDao = new PessoaDao();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(pessoaDao.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(PessoaModel pessoa)
        {
            return Json(pessoaDao.Add(pessoa), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var Pessoa = pessoaDao.ListAll().Find(x => x.PessoaID.Equals(ID));
            return Json(Pessoa, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(PessoaModel pessoa)
        {
            return Json(pessoaDao.Update(pessoa), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Delete(int ID)
        {
            return Json(pessoaDao.Delete(ID), JsonRequestBehavior.AllowGet);
        }

    }
}