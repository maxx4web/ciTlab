var querystring = require('querystring');


function home(request, response) {
    console.log("Executing home handler");

    var textContent = request.body.text;
    console.log("Your text is : " + request.body.text);
    response.send(textContent);

}

function review(request, response) {
    console.log("Executing review handler");
    var message = "Your text is : " + request.body.text;
    console.log(message);

    response.send(message);
}

function fetchLois(request, response) {
    //TODO récupérer la liste en session
    //FIXME data modifiées perdu lors du refresh de la page
    console.log("Executing fetchLois handler");

    var session = request.session;
    console.log("request.session.id : " + session.id);
    if (!session.lois) {
        //TODO fetch from a database
        console.log("init request.session.lois");
        session.lois = [{
            id: 13,
            titre: 'Citoyenneté et émancipation des jeunes',
            detail: 'Il s\'agit de proposer un modèle de société reposant sur une citoyenneté active, sur des valeurs de fraternité, d\'altruisme, de générosité. Le texte facilite l\'engagement civique de tous, et notamment des jeunes, avec la création de la réserve citoyenne, la reconnaissance systématique de l\'engagement dans les formations de l\'enseignement supérieur, et de nouvelles opportunités de faire un service civique.',
            date: '2016-05-09'
        },
            {
                id: 71,
                titre: 'Mixité sociale et égalité d\'accès au logement',
                detail: 'Le titre II du projet de loi engage des mesures structurantes dans le domaine du logement, pour favoriser le vivre-ensemble et lutter contre les phénomènes de ségrégation territoriale et de « ghettoïsation » de certains quartiers. En effet, agir pour l\'égalité et la citoyenneté impose à l\'origine d\'œuvrer contre les divisions spatiales et sociales qui minent le quotidien et pèsent sur les parcours de vie de chacun comme sur la solidarité entre tous. Un urbanisme qui concentre les populations les plus pauvres dans les territoires les moins attractifs en termes d\'emplois, de desserte et d\'équipements culturels ne peut que mettre en cause la cohésion sociale de la France et les valeurs de la République, au premier rang desquelles l\'égalité et la fraternité. La politique du logement doit être l\'un des leviers privilégiés pour organiser la mixité sociale et le développement harmonieux de nos villes et de nos territoires.',
                date: '2016-11-02'
            }];
    }
    logSessionLois(session);
    response.send(session.lois);
}

function logSessionLois(session) {
    session.lois.forEach(function (element) {
        console.log(element);
    });
}

function updateSessionLois(session) {
    session.lois.forEach(function (loi) {
        loi.id++;
    });
}

function updateLoi(request, response) {
    var session = request.session;
    console.log("request.session.id : " + session.id);
    updateSessionLois(session);
    console.log('views: ' + session.views);
}


function fetchAmendements(request, response) {
    console.log("Executing fetchAmendements handler");
    var id_loi = request.query.id_loi;
    console.log("id_loi : " + id_loi);

    var amendements = {};
    //TODO fetch from a database
    if (id_loi > 50) {

        amendements = [
            {
                titre: "Article 16 - Chef de filât des politiques de jeunesse confié aux régions avec mission de coordination de l'information des jeunes",
                texte: "Les politiques de la jeunesse mises en œuvre par les institutions publiques ont toutes pour objectif de permettre aux jeunes de devenir autonomes, de s'épanouir dans leurs projets de vie, d'utiliser leurs droits et de devenir des citoyens à part entière. ",
                id_loi: id_loi
            },
            {
                titre: "Article 17 - Information santé, couverture sociale et prévention régulière pour tous les jeunes",
                texte: "Faciliter l'information des jeunes en matière de santé, de prévention et de couverture sociale.",
                id_loi: id_loi
            }];
    } else {
        amendements = [
            {
                titre: "Article 11 - Chef de filât des politiques de jeunesse confié aux régions avec mission de coordination de l'information des jeunes",
                texte: "Les politiques de la jeunesse mises en œuvre par les institutions publiques ont toutes pour objectif de permettre aux jeunes de devenir autonomes, de s'épanouir dans leurs projets de vie, d'utiliser leurs droits et de devenir des citoyens à part entière. ",
                id_loi: id_loi
            },
            {
                titre: "Article 12 - Information santé, couverture sociale et prévention régulière pour tous les jeunes",
                texte: "Faciliter l'information des jeunes en matière de santé, de prévention et de couverture sociale.",
                id_loi: id_loi
            }];
    }
    response.send(amendements);
}


exports.home = home;
exports.review = review;
exports.fetchLois = fetchLois;
exports.updateLoi = updateLoi;
exports.fetchAmendements = fetchAmendements;
