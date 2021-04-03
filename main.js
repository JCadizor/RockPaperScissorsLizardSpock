console.log('Rock Paper Scissors Lizard Spock!')

window.addEventListener('DOMContentLoaded',()=>{
    _Setup();
});

const _SHAPES = {
    spock: {scissors:'smashes',rock:'vaporizes'},
    lizard: {spock:'poisons',paper:'eats'},
    rock: {scissors:'crushes',lizard:'smashes'},
    scissors: {paper:'cuts',lizard:'decapitates'},
    paper: {rock:'covers',spock:'disporves'}
};

let _AIChoice = null;
let _PlayerChoice = null;
let _Score = [0,0];


function _Setup(){
    for(const k in _SHAPES){
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const img = document.createElement('img');
        img.src =k + '.svg'
        console.log(img.src)
        div1.id=k;
        div1.className ='style unselected'
        div1.appendChild(img);
        div1.onclick = (e) =>{
            _Select(e);
        };
        div2.id = 'ai-' + k;
        div2.className ='style unselected';
        div2.appendChild(div1);

        document.getElementById('selection').appendChild(div2)
    }
    _UpdateScore();
}

function _UpdateScore(){
    document.getElementById('score').innerText = _Score[0] + ':'+_Score[1];
}

function _Select(evt){
    for(const k in _SHAPES){
        const node = document.getElementById(k);
        node.className = 'style unselected';
    }
    evt.currentTarget.className = "style selected"
    _PlayerChoice = evt.currentTarget.id;

    _AIChoose(100);
}

function _AIChoose(delay){
    console.log(delay);
    for(const k in _SHAPES){
        const node = document.getElementById(k);
        node.parentNode.className = "style unselected";
    }

    const possibleSelections = Object.keys(_SHAPES);
    const roll=Math.floor(Math.random()*possibleSelections.length);
    
    const choice = possibleSelections[roll];
    const node = document.getElementById(choice);
    node.parentNode.className = "style aiSelected";
    _AIChoice = choice;

    if (delay < 200) {
        setTimeout(() =>{
            _AIChoose(delay+20)
        },delay);
    }else{
        _ResolveWinner();
    }

}

function _ResolveWinner(){
    let desc = '';
    if (_AIChoice == _PlayerChoice) {
        desc = 'Tie game';
    }else if (_AIChoice in _SHAPES[_PlayerChoice]){
        desc = 'Player Wins: ';
        desc +=(_PlayerChoice +' '+_SHAPES[_PlayerChoice][_AIChoice]+
        ' '+_AIChoice+'.');
        _Score[0]+=1;
    }else{
        desc = 'AI Wins: ';
        desc +=(_AIChoice +' '+_SHAPES[_AIChoice][_PlayerChoice]+
        ' '+_PlayerChoice+'.');
        _Score[1]+=1;
    }
    document.getElementById('description').innerText = desc;
    _UpdateScore();
}

function _IsWinner(player1, player2){
    return player2 in _CHOICES[player1];
}