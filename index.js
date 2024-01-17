const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

canvas.addEventListener('click', (e) => {
    for (let i = 0; i < 100; i++) {
        atoms.push(new Atom(e.x, e.y));
    }
    animate();
});

canvas.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 20; i++) {
        atoms.push(new Atom(e.x, e.y));
    }
    animate();
});

let ultimoTiempo = 0;
const FPS = 60;

const animate = (tiempoActual) => {

    tiempoActual *= 0.001;
    const deltaTiempo = tiempoActual - ultimoTiempo;

    if(deltaTiempo > 1 / FPS){

        ultimoTiempo = tiempoActual;

        atoms.forEach(atom => {
            atom.draw();
            atom.updateSpeed();
            atom.updateSize();
    
            if ( atom.radious < 0.3 ){
                atoms.splice(atoms.indexOf(atom), 1)
            }
        });
    
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
    

    requestAnimationFrame(animate);
};

class Atom {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radious = Math.random() * 8 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
    }

    updateSpeed(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    updateSize(){
        this.radious -= 0.1;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radious, 0, Math.PI * 2)
        ctx.fill();
    }
}