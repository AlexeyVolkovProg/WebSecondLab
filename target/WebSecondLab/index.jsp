<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<jsp:useBean id="entries" class="lab2.model.EntriesBean" scope="session"/>


<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/stylePage.css">
</head>
<body>
<div class="wrapper">
    <div class="content">
        <div class="site-header">
            <div class="header-section">
                <div class="logo">
                    <a href="https://itmo.ru/?out">
                        <img src="images/itmo-logo-dark.svg" alt="">
                    </a>
                </div>
                <div class="lab-info">
                    <p>Лабораторная работа №2</p>
                </div>
                <div class="owner-info">
                    <p>Волков Алексей</p>
                    <p>Группа: P3213</p>
                    <p>Вариант: 2323</p>
                </div>
            </div>
        </div>

        <div class="main-question">
            <p>Попадет ли ваша точка в закрашенную область?</p>
        </div>

        <div class="main-content">
            <div class="diagram-section">
                <canvas id="graph" width="300" height="300"></canvas>
            </div>
            <div class="user-form-section">
                <form class="user-form" action="${pageContext.request.contextPath}/web2" method="post">
                    <div class="x_coordinate block">
                        <div class="button_block">
                            <label>X:</label>
                            <button type="button" class="x_button" id="b-4.0">-4.0</button>
                            <button type="button" class="x_button" id="b-3.0">-3.0</button>
                            <button type="button" class="x_button" id="b-2.0">-2.0</button>
                            <button type="button" class="x_button" id="b-1" >-1</button>
                            <button type="button" class="x_button" id="b0">0</button>
                            <button type="button" class="x_button" id="b1" >1</button>
                            <button type="button" class="x_button" id="b2">2.0</button>
                            <button type="button" class="x_button" id="b3">3.0</button>
                            <button type="button" class="x_button" id="b4">4.0</button>
                            <input type="hidden" name="x" id="hideX">
                        </div>
                    </div>
                    <div class="y_coordinate block">
                        <label for="selector_y">Y:</label>
                        <input placeholder="Coordinate Y [-3;5]" type="text" name="y" id="selector_y" maxlength="6" tabindex="2">
                    </div>
                    <div class="r_coordinate block">
                        <label for="selector_r">R:</label>
                        <input placeholder="Coordinate R [1;4]" type="text" name="r" id="selector_r" maxlength="6" tabindex="3">
                    </div>
                    <input class="input-form__hidden_timezone" type="hidden" id="hideDate" name="timezone" value="">
                    <div>
                        <button type="submit">Send</button>
                        <button class="clearButton" type="reset">Clear</button>
                    </div>
                </form>
            </div>
            <div class="table-section" id="results">
                <table class="table-results">
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Время запуска</th>
                        <th>Время работы</th>
                        <th>Результат</th>
                    </tr>
                    <c:forEach var="entry" items="${entries.entries}">
                        <tr>
                            <td>${entry.x}</td>
                            <td>${entry.y}</td>
                            <td>${entry.r}</td>
                            <td>${entry.currentTime}</td>
                            <td>${entry.executionTime}</td>
                            <td>${entry.result}</td>
                        </tr>
                    </c:forEach>
                </table>
            </div>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="js/PrinterGraph.js"></script>
<script src="js/mainValidator.js"></script>
</body>
</html>

