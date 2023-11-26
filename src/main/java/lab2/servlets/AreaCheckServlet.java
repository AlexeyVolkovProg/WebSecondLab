package lab2.servlets;

import lab2.model.EntriesBean;
import lab2.model.Entry;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;


public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();
        String xString = request.getParameter("x");
        String yString = request.getParameter("y").replace(",", ".");
        String rString = request.getParameter("r").replace(",", "."); // новое поле для ввода
        boolean isValidValues = validateValues(xString, yString, rString);
        if (isValidValues) {
            double xValue = Double.parseDouble(xString);
            double yValue = Double.parseDouble(yString);
            double rValue = Double.parseDouble(rString);
            boolean idAreaHit = checkArea(xValue, yValue, rValue); // отслеживаем попадание
            String currentTime;
            OffsetDateTime currentClientTime = OffsetDateTime.now(ZoneOffset.UTC);
            try {
                currentClientTime = currentClientTime.minusMinutes(Long.parseLong(request.getParameter("timezone")));
                currentTime = currentClientTime.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            } catch (Exception exception) {
                currentTime = "HH:mm:ss";
            }
            String executionTime = String.valueOf(System.nanoTime() - startTime);
            EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
            if (entries == null){
                entries = new EntriesBean();
            }
            entries.getEntries().add(new Entry(xValue, yValue, rValue, currentTime, executionTime, idAreaHit));
            request.getSession().setAttribute("entries", entries);
        }
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }


    private Boolean checkArea(double xVal, double yVal, double rVal) {
        return checkCircle(xVal, yVal, rVal) || checkRectangle(xVal, yVal, rVal) || checkTriangle(xVal, yVal, rVal);
    }

    private boolean checkCircle(double xVal, double yVal, double rVal) {
        return xVal <= 0 && yVal >= 0 && Math.sqrt(xVal*xVal + yVal*yVal) <= rVal/2;
    }

    private boolean checkRectangle(double xVal, double yVal, double rVal) {
        return yVal<=0 && xVal >= 0 && xVal <= rVal && yVal >= -rVal;
    }

    private boolean checkTriangle(double xVal, double yVal, double rVal) {
        return xVal <= 0 && yVal <= 0 && yVal >= (-(xVal/2) - (rVal/2));
    }

    private boolean validateValues(String xString, String yString, String rString) {
        return validateX(xString) && validateY(yString) && validateR(rString);
    }

    private boolean validateX(String xVal) {
        try {
            Double[] xCorrectValues = {-4.0, -3.0, -2.0, -1.0, 0d, 1.0, 2.0, 3.0, 4.0};
            double xValue = Double.parseDouble(xVal);
            return Arrays.asList(xCorrectValues).contains(xValue);
        } catch (NumberFormatException exception) {
            return false;
        }
    }

    private boolean validateY(String yVal) {
        try {
            double yValue = Double.parseDouble(yVal);
            return yValue >= -3 && yValue <= 5;
        } catch (NumberFormatException exception) {
            return false;
        }
    }


    private boolean validateR(String rVal) {
        try {
            double rValue = Double.parseDouble(rVal);
            return rValue >= 1 && rValue <= 4;
        } catch (NumberFormatException exception) {
            return false;
        }
    }
}
