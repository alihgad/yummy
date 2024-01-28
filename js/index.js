let width = $("#side").innerWidth();
$("nav").css({ left: `-${width}px` });

setTimeout(function () {
    $("#loader").slideUp(500);

}, 100)


function allNone() {
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#area").addClass("d-none");
    $("#ingradients").addClass("d-none");
    $("#contact").addClass("d-none");
    $("#details").addClass("d-none");
    $("main").removeClass("d-none");
}


$("#search-tab").on("click", function (e) {
    allNone();
    $("#search").removeClass("d-none");
})

$("#categories-tab").on("click", function (e) {
    allNone();
    $("#categories").removeClass("d-none");
    $("#catContent").removeClass("d-none")
    $("#singleCatContent").addClass("d-none")
})

$("#area-tab").on("click", function (e) {
    allNone();
    $("#area").removeClass("d-none");
    $("#areaCont").removeClass("d-none")
    $("#singleareaContent").addClass("d-none")
})

$("#ingradients-tab").on("click", function (e) {
    allNone();
    $("#ingradients").removeClass("d-none");
    $("#catContent").removeClass("d-none")
    $("#singleCatContent").addClass("d-none")
})

$("#contact-tab").on("click", function (e) {
    allNone();
    $("#contact").removeClass("d-none");
    $("#catContent").removeClass("d-none")
    $("#singleCatContent").addClass("d-none")
})




$(".burger").click(function (e) {
    if (($("nav").css("left")).split("px")[0] < 0) {
        $("[role = 'presentation']").animate({left:0 , bottom:0},600)
        $("nav").animate({ left: 0 },300);
        $(".burger").removeClass("fa-bars")
        $(".burger").addClass("fa-x")
    } else {
        let width = $("#side").innerWidth();
        $("[role = 'presentation']").animate({left:'-100%' , bottom:'-100%'},600)
        $("nav").animate({ left: `-${width}px` });
        $(".burger").removeClass("fa-x")
        $(".burger").addClass("fa-bars")
    }

})



$("#side ul li").click(function () {
    let width = $("#side").innerWidth();
    $("nav").animate({ left: `-${width}px` });
    $(".burger").removeClass("fa-x")
    $(".burger").addClass("fa-bars")

})

async function getByFirstLetter() {
    let firstLetter = $("#firstLetter").val();
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
    let data = await res.json();
    displayDataFirstLetter(data);
    console.log(data);
}

function displayDataFirstLetter(data) {
    let html = "";
    for (let i = 0; i < data.meals.length; i++) {
        html += `
              <div id="${data.meals[i].idMeal}" class="meal pt-4 overflow-hidden rounded ">
                <div class="box position-relative">
                  <img class="w-100 rounded" src="${data.meals[i].strMealThumb}" alt="">
                  <div class="position-relative  white position-absolute  text-center rounded bg-white bg-opacity-75 w-100 d-flex justify-content-center align-items-center">
                  <div class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>

                    <div class="text">
                      <h4 class="position-relative">${data.meals[i].strMeal}</h4>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        `;
    }
    $("#searchResult").html(html);

    setTimeout(function () {
        $(".meal").click(function (e) {
            let id = $(e.target).parent().parent().parent().attr("id");
            let index;
            $("main").addClass("d-none");
            $("#details").removeClass("d-none");

            for (let i = 0; i < data.meals.length; i++) {
                if (id == data.meals[i].idMeal) {
                    index = i
                }
            }



            let ingredientArr = [];
            const map = new Map(Object.entries(data.meals[index]));
            let flag = false
            for (const [key, value] of map) {
                if (key == "strIngredient1") {
                    flag = true
                }
                if (flag) {
                    if (value) {
                        ingredientArr.push(value)
                    } else {
                        break;
                    }
                }
            }




            $("#detailsContent").html(`
            <div class="col-md-4">
            <img class="w-100" src="${data.meals[index].strMealThumb}" alt="" />
            <h4 class="mt-3">${data.meals[index].strMeal}</h4>
          </div>
          <div class="col-md-8 position-relative ">
            <i id="close" class="fa-solid fa-x position-absolute end-0 close"></i>
            <h5>instructions</h5>
            <p>
            ${data.meals[index].strInstructions}
            </p>
            <p><b>area :</b> ${data.meals[index].strArea}</p>
            <p><b>category :</b> ${data.meals[index].strCategory}</p>
            <p><b>Recipes :</b></p>
            <div id="recipes" class="recipes">

              
            </div>
                <div id="tags">
                    <p><b>tags :</b></p>
                </div>

                <a href="${data.meals[index].strSource}" class="text-decoration-none" >
                    <button class="btn btn-outline-danger"> source </button>
                </a>

                <a href="${data.meals[index].strYoutube}" class="text-decoration-none" >
                    <button class="btn btn-success"> youtube </button>
                </a>

          </div>
            `
            )

            for (let i = 0; i < ingredientArr.length; i++) {
                $("#recipes").append(`<span class="badge bg-primary me-3 mb-3 px-3 py-2 ">${ingredientArr[i]}</span>`)
            }
            $("#close").click(function () {
                $("main").removeClass("d-none");
                $("#details").addClass("d-none");
            });

            let tagsArr = data.meals[index].strTags.split(",")
            for (let i = 0; i < tagsArr.length; i++) {
                $("#tags").append(`<span class="badge bg-danger me-3 mb-3 px-3 py-2 ">${tagsArr[i]}</span>`)
            }
        })
    }, 100)

}




$("#firstLetter").on("input", (e) => {
    getByFirstLetter();


})



async function getByName() {
    let name = $("#name").val();
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await res.json();
    displayDataName(data);
}

function displayDataName(data) {
    let html = "";
    if (data.meals == null) {
        html = `<h1 class="text-center w-100 text-danger text-capitalize mt-5 pt-5"> wrong data</h1>`
        $("#searchResult").html(html);

    }
    for (let i = 0; i < data.meals.length; i++) {
        html += `
              <div id=${data.meals[i].idMeal} class="meal pt-4 overflow-hidden rounded ">
                <div class="box position-relative">
                  <img class="w-100 rounded" src="${data.meals[i].strMealThumb}" alt="">
                  <div class="white position-absolute  text-center rounded bg-white bg-opacity-75 w-100 d-flex justify-content-center align-items-center">
                  <div class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>
                    <div class="text">
                      <h4">${data.meals[i].strMeal}</h4>
                  </div>
                </div>
              </div>
            </div>

        `;
    }

    $("#searchResult").html(html);

    setTimeout(function () {
        $(".meal").click(function (e) {
            let id = $(e.target).parent().parent().parent().attr("id");
            let index;
            $("main").addClass("d-none");
            $("#details").removeClass("d-none");

            for (let i = 0; i < data.meals.length; i++) {
                if (id == data.meals[i].idMeal) {
                    index = i
                }
            }



            let ingredientArr = [];
            const map = new Map(Object.entries(data.meals[index]));
            let flag = false
            for (const [key, value] of map) {
                if (key == "strIngredient1") {
                    flag = true
                }
                if (flag) {
                    if (value) {
                        ingredientArr.push(value)
                    } else {
                        break;
                    }
                }
            }




            $("#detailsContent").html(`
                <div class="col-md-4">
                <img class="w-100" src="${data.meals[index].strMealThumb}" alt="" />
                <h4 class="mt-3">${data.meals[index].strMeal}</h4>
              </div>
              <div class="col-md-8 position-relative ">
                <i id="close" class="fa-solid fa-x position-absolute end-0 close"></i>
                <h5>instructions</h5>
                <p>
                ${data.meals[index].strInstructions}
                </p>
                <p><b>area :</b> ${data.meals[index].strArea}</p>
                <p><b>category :</b> ${data.meals[index].strCategory}</p>
                <p><b>Recipes :</b></p>
                <div id="recipes" class="recipes">
                </div>
                <div id="tags">
                    <p><b>tags :</b></p>
                </div>

                <a href="${data.meals[index].strSource}"  target="_blank" class="text-decoration-none" >
                    <button class="btn btn-outline-danger"> source </button>
                </a>

                <a href="${data.meals[index].strYoutube}"  target="_blank" class="text-decoration-none" >
                    <button class="btn btn-success"> youtube </button>
                </a>
              </div>
                `
            )
            for (let i = 0; i < ingredientArr.length; i++) {
                $("#recipes").append(`<span class="badge bg-primary me-3 mb-3 p-1">${ingredientArr[i]}</span>`)
            }
            $("#close").click(function () {
                $("main").removeClass("d-none");
                $("#details").addClass("d-none");
            });

            let tagsArr = data.meals[index].strTags.split(",")
            for (let i = 0; i < tagsArr.length; i++) {
                $("#tags").append(`<span class="badge bg-danger me-3 mb-3 px-3 py-2 ">${tagsArr[i]}</span>`)
            }
        })
    }, 100)
}

$("#name").on("input", (e) => {
    getByName();

});





// Categories

async function getCategorys() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await res.json();
    displayCategorys(data);
}
function displayCategorys(data) {
    let html = ""
    for (let i = 0; i < data.categories.length; i++) {
        html += `<div id="${data.categories[i].idCategory}" class="cat pt-4 overflow-hidden rounded col-md-3 mb-4" data-aos="fade-up">
                    <div class="box position-relative">
                    <div class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>
                    <img src="${data.categories[i].strCategoryThumb}" alt="" />
                    <div
                        class="white position-absolute text-center rounded bg-white bg-opacity-75"
                    >

                        <div class="text">
                        <h4>${data.categories[i].strCategory}</h4>
                        <p>
                            ${data.categories[i].strCategoryDescription}
                        </p>
                        </div>
                    </div>
                    </div>
                </div>`
    }
    $("#catContent").html(html);

    CatDet(data)
}

getCategorys()



function CatDet(data) {
    $(".cat").click(function (e) {
        console.log("hi");
        let id = $(e.target).parent().parent().attr("id");
        let index = 0;
        for (let i = 0; i < data.categories.length; i++) {
            if (id == data.categories[i].idCategory) {
                index = i
            }

        }
        let catName = data.categories[index].strCategory
        getByCategory(catName)

    })
}

async function getByCategory(title) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${title}`)
    let data = await res.json()
    console.log(data);
    disCatDet(data)
}

function disCatDet(data) {

    let html = "";
    for (let i = 0; i < data.meals.length; i++) {
        html += `
              <div id="${data.meals[i].idMeal}" class="meal pt-4 overflow-hidden rounded col-3 ">
                <div class="box position-relative">
                  <img class="w-100 rounded" src="${data.meals[i].strMealThumb}" alt="">
                  <div class="position-relative  white position-absolute  text-center rounded bg-white bg-opacity-75 w-100 d-flex justify-content-center align-items-center">
                  <div class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>

                    <div class="text">
                      <h4 class="position-relative">${data.meals[i].strMeal}</h4>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        `;
    }


    $("#catContent").addClass("d-none")
    $("#singleCatContent").removeClass("d-none")
    $("#singleCatContent").html(html);

    setTimeout(function () {
        $(".meal").click(async function (e) {
            let id = $(e.target).parent().parent().parent().attr("id");
            let index;
            $("main").addClass("d-none");
            $("#details").removeClass("d-none");

            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            console.log(res);
            let data = await res.json();
            console.log(data);


            for (let i = 0; i < data.meals.length; i++) {
                if (id == data.meals[i].idMeal) {
                    index = i
                }
            }


            let ingredientArr = [];
            const map = new Map(Object.entries(data.meals[index]));
            let flag = false
            for (const [key, value] of map) {
                if (key == "strIngredient1") {
                    flag = true
                }
                if (flag) {
                    if (value) {
                        ingredientArr.push(value)
                    } else {
                        break;
                    }
                }
            }




            $("#detailsContent").html(`
            <div class="col-md-4 ">
            <img class="w-100" src="${data.meals[index].strMealThumb}" alt="" />
            <h4 class="mt-3">${data.meals[index].strMeal}</h4>
          </div>
          <div class="col-md-8 position-relative ">
            <i id="close" class="fa-solid fa-x position-absolute end-0 close"></i>
            <h5>instructions</h5>
            <p>
            ${data.meals[index].strInstructions}
            </p>
            <p><b>area :</b> ${data.meals[index].strArea}</p>
            <p><b>category :</b> ${data.meals[index].strCategory}</p>
            <p><b>Recipes :</b></p>
            <div id="recipes" class="recipes">

              
            </div>
                <div id="tags">
                    <p><b>tags :</b></p>
                </div>

                <a href="${data.meals[index].strSource}" target="_blank" class="text-decoration-none" >
                    <button class="btn btn-outline-danger"> source </button>
                </a>

                <a href="${data.meals[index].strYoutube}"  target="_blank" class="text-decoration-none" >
                    <button class="btn btn-success"> youtube </button>
                </a>

          </div>
            `
            )

            for (let i = 0; i < ingredientArr.length; i++) {
                $("#recipes").append(`<span class="badge bg-primary me-3 mb-3 px-3 py-2 ">${ingredientArr[i]}</span>`)
            }
            $("#close").click(function () {
                $("main").removeClass("d-none");
                $("#details").addClass("d-none");
            });

            let tagsArr = data.meals[index].strTags.split(",")
            for (let i = 0; i < tagsArr.length; i++) {
                $("#tags").append(`<span class="badge bg-danger me-3 mb-3 px-3 py-2 ">${tagsArr[i]}</span>`)
            }
        })
    }, 100)
}



// Areas


async function getAreas() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await res.json();
    displayAreas(data);
}

function displayAreas(data) {
    let html = ""
    for (let i = 0; i < data.meals.length; i++) {
        html += `<div id="area" class="col my-4 position-relative ">
        <div class="box text-center">
        <div id="${data.meals[i].strArea}" class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>
          <i class="fa-solid fa-house-laptop"></i>
          <h3 class="text-white">${data.meals[i].strArea}</h3>
        </div>
      </div>`
    }
    $("#areaCont").html(html);
    areasDet()
}

getAreas()

function areasDet() {
    $("#area").click(async function (e) {
        e.stopPropagation();
        let area = e.target.getAttribute("id");
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        let data = await res.json()
        console.log(data);
        disAreasDet(data)
    }
    )
}

function disAreasDet(data) {
    let html = "";
    for (let i = 0; i < data.meals.length; i++) {
        html += `
              <div id="${data.meals[i].idMeal}" class="meal pt-4 overflow-hidden rounded col-3 ">
                <div class="box position-relative">
                  <img class="w-100 rounded" src="${data.meals[i].strMealThumb}" alt="">
                  <div class="position-relative  white position-absolute  text-center rounded bg-white bg-opacity-75 w-100 d-flex justify-content-center align-items-center">
                  <div class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>

                    <div class="text">
                      <h4 class="position-relative">${data.meals[i].strMeal}</h4>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        `;
    }
    $("#areaCont").addClass("d-none")
    $("#singleareaContent").removeClass("d-none")
    $("#singleareaContent").html(html);

    setTimeout(function () {
        $(".meal").click(async function (e) {
            let id = $(e.target).parent().parent().parent().attr("id");
            let index;
            $("main").addClass("d-none");
            $("#details").removeClass("d-none");

            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            console.log(res);
            let data = await res.json();
            console.log(data);


            for (let i = 0; i < data.meals.length; i++) {
                if (id == data.meals[i].idMeal) {
                    index = i
                }
            }


            let ingredientArr = [];
            const map = new Map(Object.entries(data.meals[index]));
            let flag = false
            for (const [key, value] of map) {
                if (key == "strIngredient1") {
                    flag = true
                }
                if (flag) {
                    if (value) {
                        ingredientArr.push(value)
                    } else {
                        break;
                    }
                }
            }




            $("#detailsContent").html(`
            <div class="col-md-4 ">
            <img class="w-100" src="${data.meals[index].strMealThumb}" alt="" />
            <h4 class="mt-3">${data.meals[index].strMeal}</h4>
          </div>
          <div class="col-md-8 position-relative ">
            <i id="close" class="fa-solid fa-x position-absolute end-0 close"></i>
            <h5>instructions</h5>
            <p>
            ${data.meals[index].strInstructions}
            </p>
            <p><b>area :</b> ${data.meals[index].strArea}</p>
            <p><b>category :</b> ${data.meals[index].strCategory}</p>
            <p><b>Recipes :</b></p>
            <div id="recipes" class="recipes">

              
            </div>
                <div id="tags">
                    <p><b>tags :</b></p>
                </div>

                <a href="${data.meals[index].strSource}" target="_blank" class="text-decoration-none" >
                    <button class="btn btn-outline-danger"> source </button>
                </a>

                <a href="${data.meals[index].strYoutube}"  target="_blank" class="text-decoration-none" >
                    <button class="btn btn-success"> youtube </button>
                </a>

          </div>
            `
            )

            for (let i = 0; i < ingredientArr.length; i++) {
                $("#recipes").append(`<span class="badge bg-primary me-3 mb-3 px-3 py-2 ">${ingredientArr[i]}</span>`)
            }
            $("#close").click(function () {
                $("main").removeClass("d-none");
                $("#details").addClass("d-none");
            });

            let tagsArr = data.meals[index].strTags.split(",")
            for (let i = 0; i < tagsArr.length; i++) {
                $("#tags").append(`<span class="badge bg-danger me-3 mb-3 px-3 py-2 ">${tagsArr[i]}</span>`)
            }
        })
    }, 100)
}

// ingrediants



async function geting() {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await res.json();
    displaying(data);
}

geting()

function displaying(data) {
    let html = ""
    for (let i = 0; i < 20; i++) {
        html += `<div id="ing" class="col mt-5 pointer mb-5 position-relative ing">
        <div class="box">
          <div id="${data.meals[i].strIngredient}" class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>
          <i class="fa-solid fa-drumstick-bite mb-3"></i>
          <h4 class="text-capitalize">${data.meals[i].strIngredient}</h4>
          <p>
            ${data.meals[i].strDescription}
          </p>
        </div>
      </div>
      `
    }
    $("#ingCont").html(html);
    ingDet()
}

geting()

function ingDet() {
    $(".ing").click(async function (e) {
        let ing = e.target.getAttribute("id");
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
        let data = await res.json()
        disingsDet(data)
    }
    )
}

function disingsDet(data) {
    let html = "";
    for (let i = 0; i < data.meals.length; i++) {
        html += `
              <div id="${data.meals[i].idMeal}" class="meal pt-4 overflow-hidden rounded col-3 ">
                <div class="box position-relative">
                  <img class="w-100 rounded" src="${data.meals[i].strMealThumb}" alt="">
                  <div class="position-relative  white position-absolute  text-center rounded bg-white bg-opacity-75 w-100 d-flex justify-content-center align-items-center">
                  <div class="position-absolute z-3 top-0 bottom-0 end-0 start-0 "></div>

                    <div class="text text-black">
                      <h4 class="position-relative">${data.meals[i].strMeal}</h4>
                    </div>
                  </div>

                </div>
              </div>
            </div>

        `;
    }

    $("#ingCont").html(html);

    setTimeout(function () {
        $(".meal").click(async function (e) {
            let id = $(e.target).parent().parent().parent().attr("id");
            let index;
            $("main").addClass("d-none");
            $("#details").removeClass("d-none");

            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            console.log(res);
            let data = await res.json();
            console.log(data);


            for (let i = 0; i < data.meals.length; i++) {
                if (id == data.meals[i].idMeal) {
                    index = i
                }
            }


            let ingredientArr = [];
            const map = new Map(Object.entries(data.meals[index]));
            let flag = false
            for (const [key, value] of map) {
                if (key == "strIngredient1") {
                    flag = true
                }
                if (flag) {
                    if (value) {
                        ingredientArr.push(value)
                    } else {
                        break;
                    }
                }
            }



            $("#ingCont").addClass("d-none")
            $("#singleIngCont").removeClass("d-none")

            $("#detailsContent").html(`
            <div class="col-md-4 ">
            <img class="w-100" src="${data.meals[index].strMealThumb}" alt="" />
            <h4 class="mt-3">${data.meals[index].strMeal}</h4>
          </div>
          <div class="col-md-8 position-relative ">
            <i id="close" class="fa-solid fa-x position-absolute end-0 close"></i>
            <h5>instructions</h5>
            <p>
            ${data.meals[index].strInstructions}
            </p>
            <p><b>area :</b> ${data.meals[index].strArea}</p>
            <p><b>category :</b> ${data.meals[index].strCategory}</p>
            <p><b>Recipes :</b></p>
            <div id="recipes" class="recipes">

              
            </div>
                <div id="tags">
                    <p><b>tags :</b></p>
                </div>

                <a href="${data.meals[index].strSource}" target="_blank" class="text-decoration-none" >
                    <button class="btn btn-outline-danger"> source </button>
                </a>

                <a href="${data.meals[index].strYoutube}"  target="_blank" class="text-decoration-none" >
                    <button class="btn btn-success"> youtube </button>
                </a>

          </div>
            `
            )

            for (let i = 0; i < ingredientArr.length; i++) {
                $("#recipes").append(`<span class="badge bg-primary me-3 mb-3 px-3 py-2 ">${ingredientArr[i]}</span>`)
            }
            $("#close").click(function () {
                $("main").removeClass("d-none");
                $("#details").addClass("d-none");
            });

            let tagsArr = data.meals[index].strTags.split(",")
            for (let i = 0; i < tagsArr.length; i++) {
                $("#tags").append(`<span class="badge bg-danger me-3 mb-3 px-3 py-2 ">${tagsArr[i]}</span>`)
            }
        })
    }, 100)
}



function namValidate(){
    let regx = /^[a-zA-z]{3,}$/
    let name = $("#userName").val()
    return regx.test(name)
}

$("#userName").on("input",function(){
    let name = $("#userName").val()

    if(!namValidate()){
        $("#userName").addClass("is-invalid")
        $("#userName").removeClass("is-valid")
        $("#nameHelp").removeClass("opacity-0")

    }else{
        $("#userName").removeClass("is-invalid")
        $("#userName").addClass("is-valid")
        $("#nameHelp").addClass("opacity-0")


    }

    if(!name){
        $("#userName").removeClass("is-valid")
        $("#userName").removeClass("is-invalid")
        $("#nameHelp").addClass("opacity-0")
    }

    if(namValidate() && emailValidate() && PassValidate() && ageValidate() && rePassValidate() && phoneValidate()) {
        console.log("done validation");
        $("#submit").removeClass("opacity-75")
        $("#submit").removeClass("z-n1")
    
    }else{
        $("#submit").addClass("opacity-75")
        $("#submit").addClass("z-n1") 
    }})



function phoneValidate(){
    let regx = /^01[0-9]{9}$/gm
    let phone = $("#phone").val()
    return regx.test(phone)
}

$("#phone").on("input",function(){
    let phone = $("#phone").val()

    if(!phoneValidate()){

        $("#phone").addClass("is-invalid")
        $("#phone").removeClass("is-valid")
        $("#phoneHelp").removeClass("opacity-0")


    }else{
        $("#phone").removeClass("is-invalid")
        $("#phone").addClass("is-valid")
        $("#phoneHelp").addClass("opacity-0")


    }

    if(!phone){
        $("#phone").removeClass("is-valid")
        $("#phone").removeClass("is-invalid")
        $("#phoneHelp").addClass("opacity-0")
    }


    if(namValidate() && emailValidate() && PassValidate() && ageValidate() && rePassValidate() && phoneValidate()) {
        console.log("done validation");
        $("#submit").removeClass("opacity-75")
        $("#submit").removeClass("z-n1")
    
    }else{
        $("#submit").addClass("opacity-75")
        $("#submit").addClass("z-n1") 
    }})


function PassValidate(){
    let regx = /^[0-9a-zA-Z]{5,}$/gm
    let password = $("#password").val()
    return regx.test(password)
}

$("#password").on("input",function(){
    let password = $("#password").val()
    if(!PassValidate()){

        $("#password").addClass("is-invalid")
        $("#password").removeClass("is-valid")
        $("#passHelp").removeClass("opacity-0")

    }else{
        $("#password").removeClass("is-invalid")
        $("#password").addClass("is-valid")
        $("#passHelp").addClass("opacity-0")

    }

    if(!password){
        $("#password").removeClass("is-valid")
        $("#password").removeClass("is-invalid")
        $("#passHelp").addClass("opacity-0")

    }

    if(namValidate() && emailValidate() && PassValidate() && ageValidate() && rePassValidate() && phoneValidate()) {
        console.log("done validation");
        $("#submit").removeClass("opacity-75")
        $("#submit").removeClass("z-n1")
    
    }else{
        $("#submit").addClass("opacity-75")
        $("#submit").addClass("z-n1") 
    }
})


function emailValidate(){
    let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let email = $("#email").val()
    return regx.test(email)
}

$("#email").on("input",function(){
    let email = $("#email").val()
    if(!emailValidate()){

        $("#email").addClass("is-invalid")
        $("#email").removeClass("is-valid")
        $("#emailHelp").removeClass("opacity-0")

    }else{
        $("#email").removeClass("is-invalid")
        $("#email").addClass("is-valid")
        $("#emailHelp").addClass("opacity-0")


    }

    if(!email){
        $("#email").removeClass("is-valid")
        $("#email").removeClass("is-invalid")
        $("#emailHelp").addClass("opacity-0")

    }

    if(namValidate() && emailValidate() && PassValidate() && ageValidate() && rePassValidate() && phoneValidate()) {
        console.log("done validation");
        $("#submit").removeClass("opacity-75")
        $("#submit").removeClass("z-n1")
    
    }else{
        $("#submit").addClass("opacity-75")
        $("#submit").addClass("z-n1")
    }
})


function ageValidate(){
    let age = $("#age").val()
    return age > 18 && age < 99
}

$("#age").on("input",function(){
    let age = $("#age").val()
    if(!ageValidate()){

        $("#age").addClass("is-invalid")
        $("#age").removeClass("is-valid")
        $("#ageHelp").removeClass("opacity-0")


    }else{
        $("#age").removeClass("is-invalid")
        $("#age").addClass("is-valid")
        $("#ageHelp").addClass("opacity-0")


    }

    if(!age){
        $("#age").removeClass("is-valid")
        $("#age").removeClass("is-invalid")
    }

    if(namValidate() && emailValidate() && PassValidate() && ageValidate() && rePassValidate() && phoneValidate()) {
        console.log("done validation");
        $("#submit").removeClass("opacity-75")
        $("#submit").removeClass("z-n1")
    
    }else{
        $("#submit").addClass("opacity-75")
        $("#submit").addClass("z-n1")
    }
    }
)




function rePassValidate(){
    let repassword = $("#rePassword").val()
    let password = $("#password").val()
    return password === repassword
}

$("#rePassword").on("input",function(){
    let rePassword = $("#rePassword").val()
    let password = $("#password").val()
    console.log(rePassword == password);
    if(!rePassValidate()){

        $("#rePassword").addClass("is-invalid")
        $("#rePassword").removeClass("is-valid")
        $("#rePassHelp").removeClass("opacity-0")


    }else{
        $("#rePassword").removeClass("is-invalid")
        $("#rePassword").addClass("is-valid")
        $("#rePassHelp").addClass("opacity-0")


    }

    if(!rePassword){
        $("#rePassword").removeClass("is-valid")
        $("#rePassword").removeClass("is-invalid")
        $("#rePassHelp").addClass("opacity-0")
    }

    if(namValidate() && emailValidate() && PassValidate() && ageValidate() && rePassValidate() && phoneValidate()) {
        console.log("done validation");
        $("#submit").removeClass("opacity-75")
        $("#submit").removeClass("z-n1")
    
    }else{
        $("#submit").addClass("opacity-75")
        $("#submit").addClass("z-n1")
    }
})


