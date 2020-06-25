var prompt = require ('prompt-sync')();
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./dados');
let torre1 = [];
let torre2 = [];
let torre3 = [];
let ini = 0;
let fim = 0;
let passos;
let numeroDiscos;
let nome;
let opcao = 0;


////////////////////////////////
menu(); //inicia o jogo
///////////////////////////////
function menu(){
    do{
        console.clear();
        console.log('\n');
        console.log('Bem-vindo(a) a Torre de Hanói!');
        console.log('1.  Iniciar novo jogo');
        console.log('2.  Ver récordes');
        console.log('3.  Como jogar');
        console.log('4.  Regras do jogo');
        console.log('0.  Sair');
        opcao = Number(prompt('Digite uma opção: ').trim());
        
        switch(opcao){
            
            case 1: novoJogo();
                break;
            case 2: recordes();
                break;
            case 3: comoJogar();
                break;
            case 4: regrasDoJogo();
                break;
            case 0: break;
            default: console.log('\nOpção Inválida!\n');    
        }
    
    
    }while(opcao != 0);
}


function reset(numeroDiscos){
    limpaTorres();
    for(i = 1; i <= numeroDiscos; i++){
        torre1.push(i);
        torre2.push(0);
        torre3.push(0);
    }
    torre1.push(10);
    torre2.push(10);
    torre3.push(10);
    
}

function limpaTorres(){
        torre1 = [];
        torre2 = [];
        torre3 = [];
        passos = 0;
}



function novoJogo(){
    nome = prompt('Para começar, digite seu nome: ');
    do{
        numeroDiscos = Number(prompt('Com quantos discos você quer jogar? '));
        if(numeroDiscos < 3 || numeroDiscos > 6){
            console.log('Por favor, o número de discos deve ser entre 3 e 6.');
        }
    }while(numeroDiscos < 3 || numeroDiscos > 6);
    
    reset(numeroDiscos);
    
    do{
        console.clear();
        console.log('\n')
        imprimir();
        testaSeAcabou();
        ini = Number(prompt('Mover de: '));
        fim = Number(prompt('Para: '));
    
        if((ini == 1 || ini == 2 || ini == 3) && (fim == 1 || fim == 2 || fim == 3)){
            mover(ini, fim);
        }else{
            if(ini != -1){
                console.log('Torre inválida!\n');
            }
        }
    }while(ini != -1); 
}

function comoJogar(){
    console.clear();
    console.log('\n\nPara iniciar um novo jogo, selecione a opção 1. Após digite seu nome e quantos discos queira jogar (1 - 6). Para sair do jogo e voltar ao menu, basta digitar "-1" no item "mover de". Quanto menos passos você levar, isso se tornará um récorde, sendo listado na opção 2 do menu.\n')
    if(Number(prompt('Voltar ao menu? (1 -SIM) ')) == 1){
        menu();
    }else{
        comoJogar();  
    }
}

function regrasDoJogo(){
    console.clear();
    console.log('O objetivo deste jogo consiste em deslocar todos os discos da haste onde se encontram para uma haste diferente, respeitando as seguintes regras: \n');
    console.log('* Deslocar um disco de cada vez, o qual deverá ser o do topo de uma das três hastes');
    console.log('* Cada disco nunca poderá ser colocado sobre outro de diâmetro mais pequeno.');
    if(Number(prompt('Voltar ao menu? (1 -SIM) ')) == 1){
        menu();
    }else{
        regrasDoJogo();  
    }
}

function recordes(){
    console.clear()
    if (!localStorage.getItem('historico.txt')) {
        console.log('\nNão há nada por aqui... (ainda)!\n');
        menu();
    } 
    console.log('\nRécordes registrados até o momento\n');
    var dados = localStorage.getItem('historico.txt');
    var linhas = dados.split('\n');
    
    let recordeNome = [' - ',' - ',' - ',' - '];
    let recordePassos = [0,0,0,0];
    let todosNomes = [];
    let todosPassos = [];
    let todosDiscos = [];
    let inic3 = 0;
    let inic4 = 0;
    let inic5 = 0;
    let inic6 = 0;

    for(i = 0; i < linhas.length; i++){ //somente pega o primeiro elemento do array de cada disco.
        var partes = linhas[i].split(';');
      
        if(Number(partes[2]) == 3){
            if(inic3 == 0){
                recordePassos[0] = Number(partes[1]);
                recordeNome[0] = partes[0];
                inic3 ++;
            }
        }
        if(Number(partes[2]) == 4){
            if(inic4 == 0){
                recordePassos[1] = Number(partes[1]);
                recordeNome[1] = partes[0];
                inic4 ++;
            }
        } 
        if(Number(partes[2]) == 5){
            if(inic5 == 0){
                recordePassos[2] = Number(partes[1]);
                recordeNome[2] = partes[0];
                inic5 ++;
            }
        } 
        if(Number(partes[2]) == 6){
            if(inic6 == 0){
                recordePassos[3] = Number(partes[1]);
                recordeNome[3] = partes[0];
                inic6 ++;
            }
        }  
    }

    
    for(i = 0; i < linhas.length; i++){
        var partes = linhas[i].split(';');
        todosNomes.push(partes[0]);
        todosPassos.push(partes[1]);
        todosDiscos.push(partes[2]);

        console.log("\nNome: " + partes[0] + ". Passos: " + partes[1] + " Número de discos: " + partes[2]);
        switch(Number(partes[2])){
            case 3:
                if(Number(partes[1]) < recordePassos[0]){
                    recordePassos[0] = partes[1];
                    recordeNome[0] = partes[0];
                }
                break;
            case 4:  
                if(Number(partes[1]) < recordePassos[1]){
                    recordePassos[1] = partes[1];
                    recordeNome[1] = partes[0];
                }
                break;
            case 5:  
                if(Number(partes[1]) < recordePassos[2]){
                    recordePassos[2] = partes[1];
                    recordeNome[2] = partes[0];
                }
                break;
            case 6: 
                if(Number(partes[1]) < recordePassos[3]){
                    recordePassos[3] = partes[1];
                    recordeNome[3] = partes[0];
                }
                break;
        }
    }
   

    console.log("\n\n   ---Récordes---   \n");
    console.log("3 discos: " + recordeNome[0] + ". Numero de passos: " + recordePassos[0]);
    console.log("4 discos: " + recordeNome[1] + ". Numero de passos: " + recordePassos[1]);
    console.log("5 discos: " + recordeNome[2] + ". Numero de passos: " + recordePassos[2]);
    console.log("6 discos: " + recordeNome[3] + ". Numero de passos: " + recordePassos[3]);
    console.log("\n\n");
    if(Number(prompt('Voltar ao menu? (1 -SIM) ')) == 1){
        menu();
    }else{
        recordes();  
    }
    
}

function processar(numero){
    switch(numero){
        case 0: return '      |      ';
            break;
        case 1: return '     _|_     ';
            break;
        case 2: return '    __|__    ';
            break;
        case 3: return '   ___|___   ';
            break;
        case 4: return '  ____|____  ';
            break;
        case 5: return ' _____|_____ ';
            break;
        case 6: return '______|______';
            break;
        case 10: return '             ';
            break;
    }
}

function setHistorico() {
    let dados = ''
    
    if (localStorage.getItem('historico.txt')) {
        
        dados = localStorage.getItem('historico.txt') + '\n'
    }    
    localStorage.setItem('historico.txt', dados + nome + ';' + passos + ';' + numeroDiscos);

}

function getHistorico(){
    return localStorage.getItem('historico.txt'); 
}


function imprimir(){
    for(i = 0; i < torre1.length; i++){
        console.log(processar(torre1[i]) + '     ' + processar(torre2[i]) + '     ' + processar(torre3[i]));
        
    }
    console.log('Torre 1        Torre 2        Torre 3\n\nVocê utilizou ' + passos + ' passos até agora.\n');
}

function testaSeAcabou(){
    if(torre3[0] == 1){
        console.log("Parabéns! Você venceu! " + passos + " passos foram necessários.");
        setHistorico();
        menu();
    }
}



function mover(ini, fim){
   
    let torreIni;
    let torreFim;
    switch(ini){
        case 1: torreIni = torre1;
            break;
        case 2: torreIni = torre2;
            break;
        case 3: torreIni = torre3;
            break;
        default: break; 
    }
    switch(fim){
        case 1: torreFim = torre1;
            break;
        case 2: torreFim = torre2;
            break;
        case 3: torreFim = torre3;
            break;
        default: break; 
    }
    
    for(i = 0; i < torreIni.length; i++){
        if(torreIni[i] != 0){
            break;
        }
    }
    for(j = 0; i < torreFim.length; j++){
        if(torreFim[j] != 0){
            break;
        }
    }
    
    
    
    if(torreIni[i] < torreFim[j]){
        passos ++;
        torreFim[j - 1] = torreIni[i];
        torreIni[i] = 0;
    }
}
