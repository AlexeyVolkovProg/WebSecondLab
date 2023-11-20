package lab2.servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("x") != null
                && request.getParameter("y") != null && request.getParameter("r") != null){
            getServletContext().getRequestDispatcher("/areaCheck").forward(request, response);
        }else{
            request.getRequestDispatcher("index.jsp").forward(request, response);
        }
    }

}
