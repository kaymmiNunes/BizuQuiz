

        document.getElementById("recomecar").onclick = () => {

            const materia = new URLSearchParams(location.search).get("materia");
            const rotas = {"Informatica": "Informatica/info.html", "Português": "Português/portugues.html", "artes": "artes/artes.html", "historia": "historia/historia.html", "matematica": "matematica/matematica.html", "quimica": "quimica/quimica.html"};
            location.replace(Object.hasOwn(rotas, materia) ? "../Questoes/" + rotas[materia] : "../Pasta-html/escolhas-maycol/escolha_materias.html");

        }

        document.getElementById("voltar").onclick = () => {

            location.replace("../Pasta-html/index.html");

        }

        

    