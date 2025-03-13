window.addEventListener("scroll", function() {
   let header = document.getElementById("main-header");
   if (window.scrollY > 120) {
       header.classList.add("scrolled");
   } else {
       header.classList.remove("scrolled");
   }
});

class MobileNavbar{
   constructor(mobileMenu, navList, navLinks){
      this.mobileMenu = document.querySelector(mobileMenu)
      this.navList = document.querySelector(navList)
      this.navLinks = document.querySelectorAll(navLinks)
      this.activeClass = "active";
      this.handleClick = this.handleClick.bind(this)
   }

   animateLinks(){
      this.navLinks.forEach((link) => {
         link.style.animation 
            ? (link.style.animation = "") :
            (link.style.animation = `navLinkFade 0.5s ease forwards 0.3s`)
      })
   }

    handleClick() {
      this.navList.classList.toggle(this.activeClass)
      this.mobileMenu.classList.toggle(this.activeClass)
      this.animateLinks()
    }

   addClickEvent(){
      this.mobileMenu.addEventListener("click", this.handleClick)
   }
   init(){
      if (this.mobileMenu) {
         this.addClickEvent();
      }
      return this
   }
}
   const mobileNavbar = new MobileNavbar (
      ".mobile_menu",
      ".navlist",
      "navlist li",
   )
mobileNavbar.init()

function toggleMenu(element) {
   if (window.innerWidth <= 768) {
       var paragraph = element.querySelector("p");
       if (paragraph.style.display === "block") {
           paragraph.style.display = "none";
           element.classList.remove("open");
       } else {
           paragraph.style.display = "block";
           element.classList.add("open");
       }
   }
}
 
 let list = document.querySelectorAll('.slider .list .item');
 let slider = document.querySelector('.slider');
 let pontos = document.querySelectorAll('.pontos_nav li');
 let avancar = document.getElementById('proximo');
 let voltar = document.getElementById('anterior');

 let lastPosition = list.length - 1;
 let active = 0;
 let zIndex = 2;
 avancar.onclick = () =>{
    let newValue = active + 1 >lastPosition ? 0 : active + 1
    setItemActive(newValue, mostrarSlider)
 }
 voltar.onclick = () =>{
    let newValue = active - 1 < 0 ? lastPosition : active - 1
    setItemActive(newValue, mostrarSlider)
 }

 pontos.forEach((ponto, index) =>{
   ponto.addEventListener('click', () =>{
      setItemActive(index, mostrarSlider)
   })
 })

 const setItemActive = (newValue, funcaoResposta) => {
    if(newValue === active) return 
    let tipo = newValue > active  ? 'proximo' : 'anterior'
    active = newValue
    funcaoResposta(tipo)
 }
 let removeEffect
 let automaticokkk = setTimeout(() => {
      avancar.click()
 }, 4200);
 const mostrarSlider = (tipo) =>{
    slider.style.pointerEvents = 'none'
    let itemActiveAnterior = document.querySelector('.slider .list .item.active')
    if (itemActiveAnterior) itemActiveAnterior.classList.remove('active')
    zIndex++;
    list[active].style.zIndex = zIndex
    list[active].classList.add('active')
    
    if(tipo ==='proximo'){
      slider.style.setProperty('--transform', '25px')
    } else{
      slider.style.setProperty('--transform', '-25px')
    }
    slider.classList.add('effect')
    
    let pontoActiveAnterior = document.querySelector('.pontos_nav li.active')
    if (pontoActiveAnterior) pontoActiveAnterior.classList.remove('active')
    pontos[active].classList.add('active')

    clearTimeout(removeEffect)
    removeEffect = setTimeout(() => {
         slider.classList.remove('effect')
         slider.style.pointerEvents = 'auto'
    }, 1500)
    clearTimeout(automaticokkk)
    automaticokkk = setTimeout(() => {
         avancar.click()
    }, 4200);
 }
 

 function limpa_formulário_cep() {
   //Limpa valores do formulário de cep.
   document.getElementById('rua').value=("");
   document.getElementById('bairro').value=("");
   document.getElementById('cidade').value=("");
   document.getElementById('uf').value=("");
   document.getElementById('ibge').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
   //Atualiza os campos com os valores.
   document.getElementById('rua').value=(conteudo.logradouro);
   document.getElementById('bairro').value=(conteudo.bairro);
   document.getElementById('cidade').value=(conteudo.localidade);
   document.getElementById('uf').value=(conteudo.uf);
   document.getElementById('ibge').value=(conteudo.ibge);
} //end if.
else {
   //CEP não Encontrado.
   limpa_formulário_cep();
   alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

   //Expressão regular para validar o CEP.
   var validacep = /^[0-9]{8}$/;

   //Valida o formato do CEP.
   if(validacep.test(cep)) {

       //Preenche os campos com "..." enquanto consulta webservice.
       document.getElementById('rua').value="...";
       document.getElementById('bairro').value="...";
       document.getElementById('cidade').value="...";
       document.getElementById('uf').value="...";
       document.getElementById('ibge').value="...";

       //Cria um elemento javascript.
       var script = document.createElement('script');

       //Sincroniza com o callback.
       script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

       //Insere script no documento e carrega o conteúdo.
       document.body.appendChild(script);

   } //end if.
   else {
       //cep é inválido.
       limpa_formulário_cep();
       alert("Formato de CEP inválido.");
   }
} //end if.
else {
   //cep sem valor, limpa formulário.
   limpa_formulário_cep();
}
};
