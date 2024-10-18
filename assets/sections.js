
app.component('home', {
    data() {
        return {
            contentHome:""
        };
    },
    mounted() {
    },
    template: `
    <div class="container">
        <div class="contentHome container">    
            <contentHome style="margin:1vh"></contentHome>
        </div>
    </div>`
});

app.component('contact', {
    template: `
        <div class="container">
            <div class="container contentContact">
                <contentContact></contentContact>
            </div>
            <div class="container contentContact">
                <div class="formContainer">
                    <form class="gridBase gridContact" style="width:45.5vw">
                        <div class="gridItemForm2 gridItemTitle borderItem">
                            <label  for="method">
                                <h2>Usuario:</h2>
                            </label>
                        </div>
                        <div class="gridItemForm">
                            <input  type="method" id="method" required style="width: 8.55vw;height: 4.6vh;">
                        </div>
                        <div class="gridItemForm">
                            <input  type="user" id="user" required style="width: 35.875vw;height: 4.2vh;width: 36.09vw;h;height: 4.6vh;">
                        </div>
                        <div class="gridItemForm2 gridItemTitle borderItem">
                            <label  for="message" >
                                <h2>Mensaje:</h2>
                            </label>
                        </div>
                        <div >
                            <textarea  id="message" required style="width: 45.35vw;height: 24.1vh;max-width: 45.35vw;max-height: 24.1vh;min-width: 45.35vw;min-height: 24.1vh;">
                            </textarea>
                        </div>
                        <div class="gridItemForm2" >
                            <button class="clean bot" type="submit" style="width: 45.65vw;height: 4.8vh;">
                                <h2>Enviar</h2>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
});

app.component('phrases', {
    data() {
        return {
            url:`https://raw.githubusercontent.com/claicode/base_blog/refs/heads/main/assets/terminalTexts.json`,
            texts :["Cargando..."],
            index:0
        };
    },
    methods: {
        getTextData(){
            axios.get(this.url)
                .then(response => {
                    // Aquí puedes manejar la respuesta, por ejemplo, almacenar el contenido del documento
                    this.texts = response.data;
                    //document.getElementById("viewerPost").innerHTML = this.extDta
                    console.log('Contenido del documento:', this.extDta);
                })
                .catch(error => {
                    console.error('Error al cargar el documento:', error);
                });

        },
        typeText(text, delay) {
            const terminal = document.getElementById('terminal');
            terminal.innerHTML = '<span>(CodeChow) ~ : </span>'; // Limpiar el terminal
            let charIndex = 0;

            const typingInterval = setInterval(() => {
                terminal.innerHTML += text[charIndex];
                charIndex++;

                if (charIndex === text.length) {
                    clearInterval(typingInterval);
                    if(this.index == 4){
                        this.index = 0
                    }
                    else{
                        this.index++;
                    }
                    if (this.index < this.texts.length) {
                        setTimeout(() => this.typeText(this.texts[this.index], 100), 3000); // Delay antes del siguiente texto
                    }
                }
            }, delay);
        }
    },
    mounted(){
        this.getTextData()
        this.typeText(this.texts[this.index], 100);
    },
    template: `
    <section id="textWidget" class="container hiddenOverflow layautHead" style="align-items: baseline">
        <article id="contentPhrases" class="gridBase">
            <p style="display:flex;padding:1vh">
                <div id="terminal" style="padding-right: 0.5vh;"></div>
                <div class="cursor"></div>
            </p>
        </article>
    </section>`
});

app.component('blog-post', {
    // formato camelCase en JavaScript
    props: ['postTitle'],
    template: '<pre><code class="language-bash" >{{ postTitle }}</code></pre></h3>'
                                        
  })

