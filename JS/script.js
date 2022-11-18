const LEFT = document.getElementById('left');
const RIGHT = document.getElementById('right');
const slider = document.getElementById('slider');
const container = document.getElementById('container');
const elementos = document.querySelectorAll('.elemento');
const estilos = document.documentElement.style;
let contador = 0;
let isInTransition = false;

const direccion = {
    RIGHT: 'RIGHT',
    LEFT: 'LEFT'
};

const getTransformValue = () =>
    Number(estilos.getPropertyValue('--slide-transform').replace('px', ''));


    const reorderSlide = () => {
        const transformValue = getTransformValue();
        estilos.setProperty('--transicion', 'none');
        if(contador===elementos.length-1){
            slider.appendChild(slider.firstElementChild);
            estilos.setProperty('--slide-transform',
                `${transformValue + elementos[contador].scrollWidth}px`);
            contador--;
        } else if(contador === 0 ){
            slider.prepend(slider.lastElementChild);
            estilos.setProperty('--slide-transform',
                `${transformValue - elementos[contador].scrollWidth}px`);
            contador++;
        }

        isInTransition = false;
    }


const movimiento = direction =>{
    const transformValue = getTransformValue();    
    estilos.setProperty('--transicion', 'transform 1s');
    if (isInTransition) return;
    isInTransition = true;
    if(direction === direccion.LEFT){
        estilos.setProperty('--slide-transform',
            `${transformValue + elementos[contador].scrollWidth}px`);
        contador--;
    } else if(direction === direccion.RIGHT){
        estilos.setProperty('--slide-transform',
            `${transformValue - elementos[contador].scrollWidth}px`);
        contador++;
    }
}

RIGHT.addEventListener('click', () => movimiento(direccion.RIGHT));
LEFT.addEventListener('click', () => movimiento(direccion.LEFT));
slider.addEventListener(`transitionend`, reorderSlide);

reorderSlide();