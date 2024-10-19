app.component('posts', {
    data() {
        return {
            posts: this.$parent.data,
            dataPosts:this.$parent.data,
            categories:Object.keys(this.$parent.data),
            activeCategories:[],
            actual:0,
            widthSlidesCategory:6,
            cantCategories:3,
            wCategories:0,
            wCarousel:0
        };
    },
    methods: {
        searchItems() {
            let input = document.getElementById('searchInput').value.toLowerCase();
            this.posts = dataToPosts
            let result = {}
            for (const [key, value] of Object.entries(this.posts)) {
                let filteredData = value.filter(item => {
                    return item.title.toLowerCase().includes(input) || 
                           item.description.toLowerCase().includes(input);
                });
                if(filteredData.length > 0){
                    result[key] = filteredData
                }
            }
            if(Object.keys(result).length > 0){
                this.posts = result
            }
        },
        moveSlide(direction){
            let slidesContent = document.getElementById('contCarousel')
            let wSlide = Object.keys(this.dataPosts).length;
            this.widthSlidesCategory * (wSlide + 1)
            let y = this.widthSlidesCategory * this.cantCategories
            let diference = y- this.wCategories
            if(direction == 'back'){
                this.actual += this.widthSlidesCategory
            }
            if(direction == 'next'){
                this.actual -= this.widthSlidesCategory
            }
            if(this.actual > 0){
                this.actual =  diference
            }
            if(this.actual < diference){
                this.actual = 0
            }
            slidesContent.style.left = this.actual+'vw'
        },
        selectSlide(category){
            this.loadPosts(category)
        },
        loadCarousel(){
            let wSlide = Object.keys(this.dataPosts).length;
            let maskEle = document.getElementById("maskCarousel")
            let carouselkEle = document.getElementById("contCarousel")
            let wSlideMask = this.widthSlidesCategory * this.cantCategories
            this.wCarousel = wSlideMask
            let wSlideCar = this.widthSlidesCategory * (wSlide + 1)
            this.wCategories = wSlideCar
            maskEle.style.width = wSlideMask + "vw"
            carouselkEle.style.width = wSlideCar + "vw"
        },
        getParams(){
            let params = window.location.search;
            let iParms = params.indexOf("post")
            let cParms = params.indexOf("category")
            if(iParms != -1 && cParms != -1){
                let urlParams = new URLSearchParams(params);
                var post = urlParams.get('post');
                var category = urlParams.get('category');
                console.log("Response ...")
                this.$parent.post = true
                this.$parent.actualPost = {"category":category,"post":post}
                let index = parseInt(post) - 1
                this.$parent.objPost = dataToPosts[category][index]
                this.$parent.fetchHtml(`https://raw.githubusercontent.com/Code-Chow/ScriptSizzle/refs/heads/main/posts/${category}/${post}.html`)
            }
        },
        loadPosts(category) {
            if(category != "Todas"){
                document.getElementById("category_all").classList.remove('active')
                let iEle = this.activeCategories.indexOf(category)
                if(iEle == -1){
                    document.getElementById("category_"+category).classList.add('active')
                    this.activeCategories.push(category)
                }else{
                    document.getElementById("category_"+category).classList.remove('active')
                    this.activeCategories = this.activeCategories.filter(cat => cat != category);
                }
                this.posts = {}
                for(let aCategory of this.activeCategories){
                    this.posts[aCategory] = this.dataPosts[aCategory]
                }
            }else{
                this.activeCategories = []
                let slides = document.querySelectorAll('.carouselSlide');
                for(let slide of slides){
                    slide.classList.remove('active')
                }
                document.getElementById("category_all").classList.add('active')
                this.posts = this.dataPosts
            }
        },
        getPost(category,item){
            location.href = `index.html?post=${item}&category=${category}`
        }
    },
    mounted(){
        this.loadCarousel()
        this.getParams()
    },
    template: `<nav id="navPost" class="container layautHead">
                <div class="gridBase gridPost">
                    <div class="menuItem" style="text-align: start;">
                        <div>
                            Volver
                        </div>
                    </div>
                    <div class="menuItem" style="text-align: end;">
                        Categories
                    </div>
                    <div  class="container">
                        <div class="container botS" @click="moveSlide('back')" style="width:2vw;height:3.5vh">
                            <div>&#10094;</div>
                        </div>
                        <div id="maskCarousel">
                            <div id="contCarousel" class="carousel containerCarousel">
                                <div id="category_all" class="carouselSlide active" @click="selectSlide('Todas')">Todas</div>
                                <div :id="'category_'+category" class="carouselSlide" v-for="category in categories" @click="selectSlide(category)">
                                    {{ category }}
                                </div>
                            </div>
                        </div>
                        <div class="container botS" @click="moveSlide('next')" style="width:2vw;height:3.5vh">
                            <div>&#10095;</div>
                        </div>
                    </div>
                    <div class="menuItem">
                    </div>
                    <div class="menuItem" style="text-align: end;">
                        Search
                    </div>
                    <div class="menuItem" style="text-align: start;">
                        <input class="tInput" type="text" id="searchInput" placeholder="Search..." @input="searchItems()">
                    </div>
                </div>
            </nav>
            <section class="container" style="width:99vw">
                <div id="contentPost" >
                    <main style="padding: 2vh;text-align: center;">
                        <section>
                            <contentPost></contentPost>
                        </section>
                    </main>
                    <div style="display:flex">
                        <div class="contentL">
                            <div id="postLayout">
                                <div class="gridContainer">
                                    <div style="display:none">
                                        {{ cantityAdsPost = 8 }}
                                    </div>
                                    <div v-for="(value, key) in posts" class="gridItem2">
                                        <div class="gridItemTitleCat">
                                            <h1>{{ key }} </h1>
                                         </div>
                                         <div class="gridContainer" >
                                             <div class="gridItem2 adsItem" v-if="cantityAdsPost > 0 ">ADS
                                                    <div style="display:none">
                                                        {{ cantityAdsPost -- }}
                                                    </div>
                                            </div>
                                            <div class="gridItem" v-for="n in value.length">
                                                <article class="gridItem">
                                                    <div @click="getPost(key,n)" class="container link" style="width: 100%;display: flex;">
                                                        <div>
                                                            <figure style="height: 10vh;margin: 1vh;">
                                                                <img  :src="value[n - 1].img" alt="Logo del Blog" style="width: 11.5vh;color: var(--text-1-color);">
                                                            </figure>
                                                        </div>
                                                        <div style="height: 17vh;width: 100%;">
                                                            <div class="title" style="height: 4vh;">
                                                                <h1>
                                                                    {{ value[n - 1].title }}
                                                                </h1>
                                                            </div>
                                                            <div style="height: 12.5vh; background-color: var(--dark-color);">
                                                                <div style="text-align: end;padding-right: 1vh;">
                                                                    <time style="height: 1.5vh">
                                                                        {{ value[n - 1].date }}
                                                                    </time>
                                                                </div>
                                                                <div class="container" style="height: 11.5vh">
                                                                    <h2>
                                                                        {{ value[n - 1].description }}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                            <div class="gridItem2  adsItem" v-if="cantityAdsPost > 0 ">ADS
                                                    <div style="display:none">
                                                        {{ cantityAdsPost -- }}
                                                    </div>
                                            </div>
                                         </div>
                                    </div>
                                    <div class="gridItem2 adsItem" v-for="n in cantityAdsPost">ADS
                                        <div style="display:none">
                                            {{ cantityAdsPost -- }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside style="padding:1vh">
                            <div class="adsItem contentR" >
                            ADS
                            </div>
                        </aside>
                    </div>
                </div>
            </section>`
});