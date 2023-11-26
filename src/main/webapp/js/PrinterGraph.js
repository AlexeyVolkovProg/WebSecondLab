class PrinterGraph {
    SIZE = 300;
    LINE_WIDTH = 2;
    TEXT_SIZE = 20;
    TEXT_MARGIN = 15;
    TEXT_LINE_HEIGHT = 3;
    COLOR_RED = "#b50300"
    COLOR_GREEN = "#00b509"
    COLOR_MAIN = "#007bff"

    constructor() {
        this.canvas = document.getElementById("graph");
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = `${this.TEXT_SIZE}px Rostov`
        window.addEventListener('lastValueRUpdated', (event) => {
            this.lastValueR = event.detail;
        });
    }

    drawStartImage(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAxes();
        this.setPointerAtDot(5);
        this.setPointerAtDot(1);
    }

    redrawAll(r){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGraph(r);
        this.drawAxes();
        this.setPointerAtDot(5);
        this.setPointerAtDot(1);
        this.drawPoints();
    }

    drawAxes() {
        this.ctx.fillStyle = "black";
        this.drawArrow(-this.SIZE, this.SIZE / 2, this.SIZE, this.SIZE / 2);
        this.drawArrow( this.SIZE / 2, this.SIZE, this.SIZE / 2, 0);
    }

    drawGraph(r){ //отрисовка графика в зависимости от r, который вводился
        const totalPoints = 12;
        const pointInPixels = this.SIZE / totalPoints;
        this.ctx.fillStyle = this.COLOR_MAIN;
        this.ctx.beginPath(); // квадрат
        this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 + r * pointInPixels);
        this.ctx.lineTo(this.SIZE / 2 + r * pointInPixels, this.SIZE / 2 + r * pointInPixels);
        this.ctx.lineTo(this.SIZE / 2 + r * pointInPixels, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.fill();
        this.ctx.beginPath(); // окружность
        this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 + (r / 2) * pointInPixels);
        this.ctx.lineTo(this.SIZE / 2 - r * pointInPixels, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(
            this.SIZE / 2,
            this.SIZE / 2,
            (r/2) * pointInPixels,
            Math.PI,
            3/2 * Math.PI
        );
        this.ctx.moveTo(this.SIZE / 2, this.SIZE / 2);//оставшаяся часть окружности
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2 - (r/2) * pointInPixels);
        this.ctx.lineTo(this.SIZE / 2 - (r/2) * pointInPixels, this.SIZE / 2);
        this.ctx.lineTo(this.SIZE / 2, this.SIZE / 2);
        this.ctx.fill();
    }

    setPointerAtDot(max_r = 5) {
        const totalPoints = 12;
        const pointInPixels = this.SIZE / totalPoints;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(`${max_r}`, this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_MARGIN);
        this.ctx.fillText(`${max_r}`, this.SIZE / 2 + this.TEXT_MARGIN, this.SIZE / 2 - pointInPixels * max_r);
        this.ctx.beginPath()
        this.ctx.lineWidth = this.LINE_WIDTH;
        this.ctx.moveTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 + this.TEXT_LINE_HEIGHT);
        this.ctx.lineTo(this.SIZE / 2 + pointInPixels * max_r, this.SIZE / 2 - this.TEXT_LINE_HEIGHT);
        this.ctx.moveTo(this.SIZE / 2 + this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
        this.ctx.lineTo(this.SIZE / 2 - this.TEXT_LINE_HEIGHT, this.SIZE / 2 - pointInPixels * max_r);
        this.ctx.stroke();
    }

    drawArrow(fromx, fromy, tox, toy) { //рисуем стрелки
        var headlen = 10; // length of head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        this.ctx.beginPath();
        this.ctx.lineWidth = this.LINE_WIDTH;
        this.ctx.moveTo(fromx, fromy);
        this.ctx.lineTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.moveTo(tox, toy);
        this.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.stroke();
    }

    drawPoints(){
        var arrData=[];
        $("#results tr").each(function(){
            let currentRow=$(this);
            arrData.push({
                "x": parseFloat(currentRow.find("td:eq(0)").text()),
                "y": parseFloat(currentRow.find("td:eq(1)").text()),
                "r": parseInt(currentRow.find("td:eq(2)").text()),
                "time": currentRow.find("td:eq(3)").text(),
                "scriptTime": currentRow.find("td:eq(4)").text(),
                "status": currentRow.find("td:eq(5)").text() === "true",
            })
        });
        arrData.shift() // Delete headers
        arrData.forEach(dot =>{
            this.drawPoint(dot.x, dot.y, dot.r, dot.status)
        })
    }


    parseClick(event){
        const xPixels = event.clientX - this.canvas.getBoundingClientRect().left;
        const yPixels = event.clientY - this.canvas.getBoundingClientRect().top;
        const totalPoints = 12;
        const pointInPixels = this.SIZE / totalPoints;
        const x = - (this.SIZE / 2 - xPixels) / pointInPixels
        const y = (this.SIZE / 2 - yPixels) / pointInPixels
        if(document.getElementById("selector_r").value === "") {
            alert('Невозможно определить радиус. Выберите радиус.');
            return;
        }
        if(x > 3 || x < -5 || y > 3 || y < -3) {
            alert("Клик вне зоны графика\nX принимает значения от -5 до 3\n Y от -3 до 3")
            return
        }
        const roundedX = Math.round(x);
        const clampedX = Math.max(-4, Math.min(4, roundedX));
        xValue = clampedX;
        console.log(xValue)
        yValue = y.toFixed(2);
        console.log(yValue)
    }


    drawPoint(x, y, r, success = true) {
        let r_now = this.lastValueR
        if(r_now != null) {
            x *= r_now / r
            y *= r_now / r
        }
        this.ctx.fillStyle = success
            ? this.COLOR_GREEN
            : this.COLOR_RED;
        const totalPoints = 12;
        const pointInPixels = this.SIZE / totalPoints;
        this.ctx.beginPath();
        this.ctx.arc(
            this.SIZE / 2 + pointInPixels * x,
            this.SIZE / 2 - y * pointInPixels,
            5,
            0,
            Math.PI * 2,
        );
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.fillStyle = "black"
        this.ctx.lineWidth = 1.5
        this.ctx.arc(
            this.SIZE / 2 + pointInPixels * x,
            this.SIZE / 2 - y * pointInPixels,
            5,
            0,
            Math.PI * 2
        )
        this.ctx.stroke();
    }
}