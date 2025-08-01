import React, { useState } from 'react';
import { LuBookOpen, LuBookClose } from 'react-icons/lu';

// Data for all the words, their translations, and example sentences.
const wordData = [
  {
    german: 'der Vegetarier, - / die Vegetarierin, -nen',
    english: 'vegetarian (male/female)',
    portuguese: 'o vegetariano, -a',
    germanExample: 'Mein Bruder ist Vegetarier, er isst kein Fleisch.',
    englishExample: 'My brother is a vegetarian; he does not eat meat.',
    portugueseExample: 'Meu irmão é vegetariano; ele não come carne.',
  },
  {
    german: 'der Repräsentant, -en / die Repräsentatin, -nen',
    english: 'representative (male/female)',
    portuguese: 'o representante, -a',
    germanExample: 'Die Repräsentantin des Unternehmens stellte das neue Produkt vor.',
    englishExample: 'The company\'s representative introduced the new product.',
    portugueseExample: 'A representante da empresa apresentou o novo produto.',
  },
  {
    german: 'der / die Abgeordnete, -n',
    english: 'member of parliament',
    portuguese: 'o/a deputado/a',
    germanExample: 'Die Abgeordnete sprach im Bundestag über das neue Gesetz.',
    englishExample: 'The member of parliament spoke about the new law in the Bundestag.',
    portugueseExample: 'A deputada falou sobre a nova lei no Bundestag.',
  },
  {
    german: 'die Oberstufe, -n',
    english: 'upper secondary level, senior year (of high school)',
    portuguese: 'o ensino médio',
    germanExample: 'In der Oberstufe bereiten sich die Schüler auf das Abitur vor.',
    englishExample: 'In the senior years, students prepare for their final exams.',
    portugueseExample: 'No ensino médio, os alunos se preparam para os exames finais.',
  },
  {
    german: 'der Abiturient, -en / die Abiturientin, -nen',
    english: 'high school graduate (male/female)',
    portuguese: 'o formando do ensino médio',
    germanExample: 'Die Abiturientin feierte den erfolgreichen Abschluss ihrer Schulzeit.',
    englishExample: 'The female high school graduate celebrated the successful end of her school career.',
    portugueseExample: 'A formanda do ensino médio celebrou o sucesso de sua jornada escolar.',
  },
  {
    german: 'an|belangen',
    english: 'to concern, to be relevant to',
    portuguese: 'dizer respeito a, concernir',
    germanExample: 'Was die Arbeitszeiten anbelangt, sind wir flexibel.',
    englishExample: 'Regarding working hours, we are flexible.',
    portugueseExample: 'No que diz respeito ao horário de trabalho, somos flexíveis.',
  },
  {
    german: 'die Unterzahl (nur Sg.)',
    english: 'the minority, outnumbered',
    portuguese: 'a minoria, em desvantagem numérica',
    germanExample: 'Das Team spielte in der Unterzahl, nachdem ein Spieler eine rote Karte erhalten hatte.',
    englishExample: 'The team played outnumbered after a player received a red card.',
    portugueseExample: 'A equipe jogou em desvantagem numérica depois que um jogador recebeu um cartão vermelho.',
  },
  {
    german: 'die Überzahl (nur Sg.)',
    english: 'the majority, superior numbers',
    portuguese: 'a maioria, em vantagem numérica',
    germanExample: 'Sie waren in der Überzahl und gewannen das Spiel.',
    englishExample: 'They were in the majority and won the game.',
    portugueseExample: 'Eles estavam em vantagem numérica e venceram o jogo.',
  },
  {
    german: 'beträchtlich',
    english: 'considerable, significant',
    portuguese: 'considerável, significativo',
    germanExample: 'Die Reparaturkosten waren beträchtlich.',
    englishExample: 'The repair costs were considerable.',
    portugueseExample: 'Os custos de reparo foram consideráveis.',
  },
  {
    german: 'die Sorgearbeit (nur Sg.)',
    english: 'care work',
    portuguese: 'o trabalho de cuidado',
    germanExample: 'Sorgearbeit wie Kinderbetreuung und Pflege wird oft nicht bezahlt.',
    englishExample: 'Care work, such as childcare and caregiving, is often unpaid.',
    portugueseExample: 'O trabalho de cuidado, como a assistência infantil, frequentemente não é pago.',
  },
  {
    german: 'die Teilhabe (nur Sg.) politische Teilhabe',
    english: 'participation (political participation)',
    portuguese: 'a participação (participação política)',
    germanExample: 'Alle Bürger haben ein Recht auf politische Teilhabe.',
    englishExample: 'All citizens have a right to political participation.',
    portugueseExample: 'Todos os cidadãos têm direito à participação política.',
  },
  {
    german: 'das Rollenbild, -er',
    english: 'role model, stereotype',
    portuguese: 'o estereótipo de gênero',
    germanExample: 'Traditionelle Rollenbilder verändern sich langsam.',
    englishExample: 'Traditional gender roles are slowly changing.',
    portugueseExample: 'Os estereótipos de gênero tradicionais estão mudando lentamente.',
  },
  {
    german: 'der Wickeltisch, -e',
    english: 'changing table',
    portuguese: 'o trocador de fraldas',
    germanExample: 'In vielen öffentlichen Toiletten gibt es mittlerweile einen Wickeltisch.',
    englishExample: 'Many public restrooms now have a changing table.',
    portugueseExample: 'Muitos banheiros públicos agora têm um trocador de fraldas.',
  },
  {
    german: 'der Arbeitskreis, -e',
    english: 'working group, committee',
    portuguese: 'o grupo de trabalho',
    germanExample: 'Der Arbeitskreis trifft sich nächste Woche, um das Projekt zu besprechen.',
    englishExample: 'The working group will meet next week to discuss the project.',
    portugueseExample: 'O grupo de trabalho se reunirá na próxima semana para discutir o projeto.',
  },
  {
    german: 'lehren (an Hochschulen)',
    english: 'to teach (at universities)',
    portuguese: 'ensinar (em universidades)',
    germanExample: 'Er lehrt seit 20 Jahren an der Universität.',
    englishExample: 'He has been teaching at the university for 20 years.',
    portugueseExample: 'Ele ensina na universidade há 20 anos.',
  },
  {
    german: 'die Fakultät, -en',
    english: 'faculty, department',
    portuguese: 'a faculdade',
    germanExample: 'Sie studiert an der juristischen Fakultät.',
    englishExample: 'She studies at the law faculty.',
    portugueseExample: 'Ela estuda na faculdade de direito.',
  },
  {
    german: 'das Gender, -',
    english: 'gender',
    portuguese: 'o gênero',
    germanExample: 'Das Gender-Thema ist in der modernen Forschung sehr wichtig.',
    englishExample: 'The topic of gender is very important in modern research.',
    portugueseExample: 'O tema de gênero é muito importante na pesquisa moderna.',
  },
  {
    german: 'dementsprechend',
    english: 'accordingly, consequently',
    portuguese: 'consequentemente, de acordo',
    germanExample: 'Die Qualität war schlecht, und dementsprechend war der Preis niedrig.',
    englishExample: 'The quality was poor, and the price was accordingly low.',
    portugueseExample: 'A qualidade era ruim e, consequentemente, o preço era baixo.',
  },
  {
    german: 'etwas im Blick haben',
    english: 'to have an eye on something, to keep something in mind',
    portuguese: 'ter algo em vista, ter em mente',
    germanExample: 'Wir müssen die Kosten im Blick haben.',
    englishExample: 'We need to keep the costs in mind.',
    portugueseExample: 'Precisamos ter os custos em vista.',
  },
  {
    german: 'demzufolge',
    english: 'consequently, as a result',
    portuguese: 'portanto, consequentemente',
    germanExample: 'Er hat hart gearbeitet, demzufolge hat er eine Beförderung bekommen.',
    englishExample: 'He worked hard; consequently, he got a promotion.',
    portugueseExample: 'Ele trabalhou duro e, portanto, foi promovido.',
  },
  {
    german: 'ein|beziehen (bezieht ein, bezog ein, hat einbezogen)',
    english: 'to include, to involve',
    portuguese: 'incluir, envolver',
    germanExample: 'Wir sollten alle Mitarbeiter in die Entscheidung einbeziehen.',
    englishExample: 'We should involve all employees in the decision.',
    portugueseExample: 'Devemos envolver todos os funcionários na decisão.',
  },
  {
    german: 'inklusiv',
    english: 'inclusive',
    portuguese: 'inclusivo',
    germanExample: 'Die Schule bietet ein inklusives Bildungssystem an.',
    englishExample: 'The school offers an inclusive education system.',
    portugueseExample: 'A escola oferece um sistema de ensino inclusivo.',
  },
  {
    german: 'die Norm, -en',
    english: 'the norm, standard',
    portuguese: 'a norma, o padrão',
    germanExample: 'Es ist die Norm, pünktlich zur Arbeit zu kommen.',
    englishExample: 'It is the norm to arrive at work on time.',
    portugueseExample: 'É a norma chegar ao trabalho na hora certa.',
  },
  {
    german: 'stets',
    english: 'always, constantly',
    portuguese: 'sempre, constantemente',
    germanExample: 'Sie ist stets freundlich und hilfsbereit.',
    englishExample: 'She is always friendly and helpful.',
    portugueseExample: 'Ela é sempre simpática e prestativa.',
  },
  {
    german: 'der Standard, -s',
    english: 'the standard',
    portuguese: 'o padrão',
    germanExample: 'Unsere Produkte erfüllen die höchsten Standards.',
    englishExample: 'Our products meet the highest standards.',
    portugueseExample: 'Nossos produtos atendem aos mais altos padrões.',
  },
  {
    german: 'die Körpermaße (nur Pl.)',
    english: 'body measurements',
    portuguese: 'as medidas corporais',
    germanExample: 'Die Kleidung wird nach den Körpermaßen angefertigt.',
    englishExample: 'The clothing is made according to the body measurements.',
    portugueseExample: 'As roupas são feitas de acordo com as medidas corporais.',
  },
  {
    german: 'infolgedessen',
    english: 'as a result, consequently',
    portuguese: 'como resultado, consequentemente',
    germanExample: 'Die Nachfrage stieg, infolgedessen erhöhten wir die Produktion.',
    englishExample: 'Demand increased; as a result, we increased production.',
    portugueseExample: 'A demanda aumentou; como resultado, aumentamos a produção.',
  },
  {
    german: 'die Nutzung, -en',
    english: 'the use, usage',
    portuguese: 'o uso, a utilização',
    germanExample: 'Die Nutzung des Internets ist in vielen Ländern kostenlos.',
    englishExample: 'The use of the internet is free in many countries.',
    portugueseExample: 'O uso da internet é gratuito em muitos países.',
  },
  {
    german: 'komfortabel',
    english: 'comfortable',
    portuguese: 'confortável',
    germanExample: 'Das neue Sofa ist sehr komfortabel.',
    englishExample: 'The new sofa is very comfortable.',
    portugueseExample: 'O novo sofá é muito confortável.',
  },
  {
    german: 'die Lehne, -n die Armlehne',
    english: 'the backrest, armrest',
    portuguese: 'o encosto, o apoio de braço',
    germanExample: 'Die Lehne des Stuhls war sehr bequem.',
    englishExample: 'The backrest of the chair was very comfortable.',
    portugueseExample: 'O encosto da cadeira era muito confortável.',
  },
  {
    german: 'der Airbag, -s',
    english: 'the airbag',
    portuguese: 'o airbag',
    germanExample: 'Der Airbag schützte den Fahrer bei dem Unfall.',
    englishExample: 'The airbag protected the driver in the accident.',
    portugueseExample: 'O airbag protegeu o motorista no acidente.',
  },
  {
    german: 'lebensgefährlich',
    english: 'life-threatening, very dangerous',
    portuguese: 'com risco de vida, perigoso para a vida',
    germanExample: 'Der Sturm war lebensgefährlich, weshalb die Menschen zu Hause blieben.',
    englishExample: 'The storm was life-threatening, which is why people stayed at home.',
    portugueseExample: 'A tempestade era perigosa, por isso as pessoas ficaram em casa.',
  },
  {
    german: 'vernachlässigen',
    english: 'to neglect, to disregard',
    portuguese: 'negligenciar, descuidar',
    germanExample: 'Er vernachlässigt seine Pflichten.',
    englishExample: 'He neglects his duties.',
    portugueseExample: 'Ele negligencia seus deveres.',
  },
  {
    german: 'die Lehre, -n (an Hochschulen)',
    english: 'the teaching, instruction (at universities)',
    portuguese: 'o ensino (em universidades)',
    germanExample: 'Die Lehre an der Universität ist praxisorientiert.',
    englishExample: 'The teaching at the university is practice-oriented.',
    portugueseExample: 'O ensino na universidade é orientado para a prática.',
  },
  {
    german: 'sensibilisieren',
    english: 'to raise awareness, to sensitize',
    portuguese: 'sensibilizar',
    germanExample: 'Wir wollen die Öffentlichkeit für dieses Thema sensibilisieren.',
    englishExample: 'We want to raise public awareness of this issue.',
    portugueseExample: 'Queremos sensibilizar o público para esta questão.',
  },
  {
    german: 'das Curriculum, Curricula',
    english: 'the curriculum',
    portuguese: 'o currículo',
    germanExample: 'Das neue Curriculum enthält mehr praxisbezogene Fächer.',
    englishExample: 'The new curriculum contains more practice-oriented subjects.',
    portugueseExample: 'O novo currículo contém mais disciplinas orientadas para a prática.',
  },
  {
    german: 'die Lehrveranstaltung, -en',
    english: 'the course, lecture, class',
    portuguese: 'a aula, a disciplina',
    germanExample: 'Er muss noch zwei Lehrveranstaltungen belegen, um sein Studium abzuschließen.',
    englishExample: 'He still needs to take two courses to complete his studies.',
    portugueseExample: 'Ele ainda precisa cursar duas disciplinas para terminar seus estudos.',
  },
  {
    german: 'das Wahlfach, -..er',
    english: 'elective subject',
    portuguese: 'a disciplina optativa',
    germanExample: 'In diesem Semester habe ich drei Wahlfächer gewählt.',
    englishExample: 'This semester I chose three elective subjects.',
    portugueseExample: 'Neste semestre, eu escolhi três disciplinas optativas.',
  },
  {
    german: 'der Bestandteil, -e',
    english: 'the component, part',
    portuguese: 'o componente, a parte',
    germanExample: 'Dieser Baustein ist ein wesentlicher Bestandteil des Motors.',
    englishExample: 'This building block is an essential part of the engine.',
    portugueseExample: 'Este componente é uma parte essencial do motor.',
  },
  {
    german: 'die Schwachstelle, -n',
    english: 'the weakness, weak point',
    portuguese: 'o ponto fraco, a fragilidade',
    germanExample: 'Wir haben die Schwachstellen im System identifiziert.',
    englishExample: 'We identified the weaknesses in the system.',
    portugueseExample: 'Identificamos os pontos fracos do sistema.',
  },
  {
    german: 'identifizieren',
    english: 'to identify',
    portuguese: 'identificar',
    germanExample: 'Die Polizei konnte den Täter schnell identifizieren.',
    englishExample: 'The police were able to quickly identify the perpetrator.',
    portugueseExample: 'A polícia conseguiu identificar o agressor rapidamente.',
  },
  {
    german: 'ein|holen Meinungen einholen',
    english: 'to obtain, to gather opinions',
    portuguese: 'obter, reunir opiniões',
    germanExample: 'Wir müssen die Meinungen der Mitarbeiter einholen, bevor wir eine Entscheidung treffen.',
    englishExample: 'We need to gather the opinions of the employees before making a decision.',
    portugueseExample: 'Precisamos reunir as opiniões dos funcionários antes de tomar uma decisão.',
  },
  {
    german: 'der Fachbereich, -e',
    english: 'the department, field of study',
    portuguese: 'o departamento, a área de estudo',
    germanExample: 'Er arbeitet im Fachbereich Informatik.',
    englishExample: 'He works in the computer science department.',
    portugueseExample: 'Ele trabalha no departamento de ciência da computação.',
  },
  {
    german: 'der Dozent, -en / die Dozentin, -nen',
    english: 'the lecturer (male/female)',
    portuguese: 'o/a professor/a universitário/a',
    germanExample: 'Die Dozentin erklärte die komplexen Zusammenhänge.',
    englishExample: 'The lecturer explained the complex relationships.',
    portugueseExample: 'A professora explicou as complexas inter-relações.',
  },
  {
    german: 'infolge + Gen.',
    english: 'as a result of, due to',
    portuguese: 'em consequência de',
    germanExample: 'Infolge des Regens wurde das Spiel abgesagt.',
    englishExample: 'Due to the rain, the game was canceled.',
    portugueseExample: 'Em consequência da chuva, o jogo foi cancelado.',
  },
  {
    german: 'familienfreundlich',
    english: 'family-friendly',
    portuguese: 'amigo da família',
    germanExample: 'Das Unternehmen gilt als besonders familienfreundlich.',
    englishExample: 'The company is considered to be particularly family-friendly.',
    portugueseExample: 'A empresa é considerada particularmente amiga da família.',
  },
  {
    german: 'die Kinderbetreuung, -en',
    english: 'childcare',
    portuguese: 'o cuidado infantil',
    germanExample: 'Viele Eltern suchen nach flexiblen Optionen für die Kinderbetreuung.',
    englishExample: 'Many parents are looking for flexible childcare options.',
    portugueseExample: 'Muitos pais procuram opções flexíveis para o cuidado infantil.',
  },
  {
    german: 'die Teilzeitregelung, -en',
    english: 'part-time regulation',
    portuguese: 'o regulamento de meio período',
    germanExample: 'Die neue Teilzeitregelung ermöglicht es Mitarbeitern, flexibler zu arbeiten.',
    englishExample: 'The new part-time regulation allows employees to work more flexibly.',
    portugueseExample: 'O novo regulamento de meio período permite que os funcionários trabalhem de forma mais flexível.',
  },
  {
    german: 'die Sichtbarkeit, -en',
    english: 'the visibility',
    portuguese: 'a visibilidade',
    germanExample: 'Die Sichtbarkeit der Sterne war heute Nacht sehr gut.',
    englishExample: 'The visibility of the stars was very good tonight.',
    portugueseExample: 'A visibilidade das estrelas estava muito boa esta noite.',
  },
  {
    german: 'der Scheibenwischer, -',
    english: 'the windshield wiper',
    portuguese: 'o limpador de para-brisa',
    germanExample: 'Ich musste die Scheibenwischer einschalten, weil es stark regnete.',
    englishExample: 'I had to turn on the windshield wipers because it was raining heavily.',
    portugueseExample: 'Eu tive que ligar os limpadores de para-brisa porque estava chovendo muito.',
  },
  {
    german: 'die Errungenschaft, -en',
    english: 'the achievement, accomplishment',
    portuguese: 'a conquista, o feito',
    germanExample: 'Die Errungenschaft der Frauenbewegung ist die Gleichberechtigung.',
    englishExample: 'The achievement of the women\'s movement is equality.',
    portugueseExample: 'A conquista do movimento feminista é a igualdade.',
  },
  {
    german: 'ab|bauen Vorurteile abbauen',
    english: 'to reduce, to break down prejudices',
    portuguese: 'reduzir, eliminar preconceitos',
    germanExample: 'Bildung hilft dabei, Vorurteile abzubauen.',
    englishExample: 'Education helps to break down prejudices.',
    portugueseExample: 'A educação ajuda a eliminar os preconceitos.',
  },
  {
    german: 'die Gestaltung, -en',
    english: 'the design, arrangement',
    portuguese: 'o design, o arranjo',
    germanExample: 'Die Gestaltung des Gartens ist sehr schön.',
    englishExample: 'The design of the garden is very beautiful.',
    portugueseExample: 'O design do jardim é muito bonito.',
  },
  {
    german: 'die Gefahr, -en in Gefahr bringen',
    english: 'the danger, to endanger',
    portuguese: 'o perigo, colocar em perigo',
    germanExample: 'Sein leichtsinniges Verhalten brachte alle in Gefahr.',
    englishExample: 'His reckless behavior put everyone in danger.',
    portugueseExample: 'Seu comportamento imprudente colocou todos em perigo.',
  },
  {
    german: 'die Initiative, -n',
    english: 'the initiative',
    portuguese: 'a iniciativa',
    germanExample: 'Die Regierung ergriff eine neue Initiative, um die Wirtschaft zu stärken.',
    englishExample: 'The government took a new initiative to strengthen the economy.',
    portugueseExample: 'O governo tomou uma nova iniciativa para fortalecer a economia.',
  },
  {
    german: 'das Sortiment, -e',
    english: 'the assortment, range of products',
    portuguese: 'o sortimento, a variedade de produtos',
    germanExample: 'Der Supermarkt erweiterte sein Sortiment an Bio-Produkten.',
    englishExample: 'The supermarket expanded its range of organic products.',
    portugueseExample: 'O supermercado expandiu sua variedade de produtos orgânicos.',
  },
  {
    german: 'weswegen',
    english: 'why, for which reason',
    portuguese: 'por que, por qual razão',
    germanExample: 'Ich weiß nicht, weswegen er so verärgert ist.',
    englishExample: 'I don\'t know why he is so upset.',
    portugueseExample: 'Não sei por que ele está tão chateado.',
  },
  {
    german: 'die Spracherkennungstechnologie, -n',
    english: 'speech recognition technology',
    portuguese: 'a tecnologia de reconhecimento de voz',
    germanExample: 'Moderne Smartphones verwenden Spracherkennungstechnologie.',
    englishExample: 'Modern smartphones use speech recognition technology.',
    portugueseExample: 'Smartphones modernos usam tecnologia de reconhecimento de voz.',
  },
  {
    german: 'die Sehbehinderung, -en',
    english: 'visual impairment',
    portuguese: 'a deficiência visual',
    germanExample: 'Software für Menschen mit Sehbehinderung hilft ihnen, den Computer zu nutzen.',
    englishExample: 'Software for people with visual impairment helps them to use the computer.',
    portugueseExample: 'O software para pessoas com deficiência visual as ajuda a usar o computador.',
  },
  {
    german: 'hinein|passen',
    english: 'to fit in',
    portuguese: 'caber, encaixar',
    germanExample: 'Der Stuhl passt gut in die Ecke.',
    englishExample: 'The chair fits well in the corner.',
    portugueseExample: 'A cadeira se encaixa bem no canto.',
  },
  {
    german: 'der Algorithmus, Algorithmen',
    english: 'the algorithm, algorithms',
    portuguese: 'o algoritmo, os algoritmos',
    germanExample: 'Algorithmen lernen aus vorhandenen Daten.',
    englishExample: 'Algorithms learn from existing data.',
    portugueseExample: 'Algoritmos aprendem com dados existentes.',
  },
  {
    german: 'vorhanden',
    english: 'existing, available',
    portuguese: 'existente, disponível',
    germanExample: 'Es gibt viele vorhandene Ressourcen.',
    englishExample: 'There are many available resources.',
    portugueseExample: 'Existem muitos recursos disponíveis.',
  },
  {
    german: 'reproduzieren',
    english: 'to reproduce',
    portuguese: 'reproduzir',
    germanExample: 'Es ist schwierig, die Ergebnisse des Experiments zu reproduzieren.',
    englishExample: 'It is difficult to reproduce the results of the experiment.',
    portugueseExample: 'É difícil reproduzir os resultados do experimento.',
  },
  {
    german: 'divers',
    english: 'diverse',
    portuguese: 'diverso',
    germanExample: 'Das Team ist sehr divers, was die Fähigkeiten betrifft.',
    englishExample: 'The team is very diverse in terms of skills.',
    portugueseExample: 'A equipe é muito diversificada em termos de habilidades.',
  },
  {
    german: 'ein|fließen (fließt ein, floss ein, ist eingeflossen)',
    english: 'to be incorporated, to be included',
    portuguese: 'ser incluído, ser incorporado',
    germanExample: 'Die Ergebnisse der Umfrage sollen in die Entscheidung einfließen.',
    englishExample: 'The survey results should be incorporated into the decision.',
    portugueseExample: 'Os resultados da pesquisa devem ser incluídos na decisão.',
  },
  {
    german: 'linkshändig',
    english: 'left-handed',
    portuguese: 'canhoto',
    germanExample: 'Linkshändige Menschen müssen oft spezielle Werkzeuge verwenden.',
    englishExample: 'Left-handed people often have to use special tools.',
    portugueseExample: 'Pessoas canhotas muitas vezes precisam usar ferramentas especiais.',
  },
  {
    german: 'alleinstehend',
    english: 'single, unattached',
    portuguese: 'solteiro, sozinho',
    germanExample: 'Alleinstehende Personen haben oft besondere Bedürfnisse.',
    englishExample: 'Single people often have special needs.',
    portugueseExample: 'Pessoas solteiras frequentemente têm necessidades especiais.',
  },
  {
    german: 'die Zielgruppe, -n',
    english: 'the target group',
    portuguese: 'o público-alvo',
    germanExample: 'Die Werbekampagne richtet sich an eine junge Zielgruppe.',
    englishExample: 'The advertising campaign targets a young audience.',
    portugueseExample: 'A campanha publicitária tem como público-alvo um público jovem.',
  },
  {
    german: 'bereiten Es bereitet erhebliche Schwierigkeiten, dass …',
    english: 'to cause. It causes considerable difficulties that ...',
    portuguese: 'causar. Causa dificuldades consideráveis que ...',
    germanExample: 'Es bereitet erhebliche Schwierigkeiten, dass die Software nicht stabil läuft.',
    englishExample: 'It causes considerable difficulties that the software is not running stably.',
    portugueseExample: 'Causa dificuldades consideráveis o fato de o software não estar funcionando de forma estável.',
  },
  {
    german: 'derzeit',
    english: 'currently, at present',
    portuguese: 'atualmente, no momento',
    germanExample: 'Derzeit gibt es keine freien Plätze.',
    englishExample: 'Currently, there are no available spots.',
    portugueseExample: 'Atualmente, não há vagas disponíveis.',
  },
  {
    german: 'die Nachfrage nach + Dat.',
    english: 'the demand for',
    portuguese: 'a demanda por',
    germanExample: 'Die Nachfrage nach Elektroautos steigt.',
    englishExample: 'The demand for electric cars is increasing.',
    portugueseExample: 'A demanda por carros elétricos está aumentando.',
  },
  {
    german: 'zugeschnitten auf + Akk.',
    english: 'tailored to',
    portuguese: 'sob medida para',
    germanExample: 'Bisher gibt es nur wenige Produkte, die auf die Bedürfnisse von ... zugeschnitten sind.',
    englishExample: 'So far, there are only a few products tailored to the needs of ...',
    portugueseExample: 'Até agora, há apenas alguns produtos feitos sob medida para as necessidades de ...',
  },
  {
    german: 'ermöglichen',
    english: 'to enable, to make possible',
    portuguese: 'permitir, possibilitar',
    germanExample: 'Technologie kann uns neue Möglichkeiten ermöglichen.',
    englishExample: 'Technology can enable new possibilities for us.',
    portugueseExample: 'A tecnologia pode nos permitir novas possibilidades.',
  },
  {
    german: 'beschleunigen',
    english: 'to accelerate, to speed up',
    portuguese: 'acelerar',
    germanExample: 'Der Bau des neuen Tunnels wird den Verkehr beschleunigen.',
    englishExample: 'The construction of the new tunnel will speed up traffic.',
    portugueseExample: 'A construção do novo túnel irá acelerar o tráfego.',
  },
  {
    german: 'optimieren',
    english: 'to optimize',
    portuguese: 'otimizar',
    germanExample: 'Wir müssen unsere Prozesse optimieren, um effizienter zu werden.',
    englishExample: 'We need to optimize our processes to become more efficient.',
    portugueseExample: 'Precisamos otimizar nossos processos para nos tornarmos mais eficientes.',
  },
  {
    german: 'die Farbsehschwäche (nur Sg.)',
    english: 'color vision deficiency, color blindness',
    portuguese: 'a deficiência de visão de cores, daltonismo',
    germanExample: 'Für Menschen mit Farbsehschwäche ist die Unterscheidung von Rot und Grün oft schwierig.',
    englishExample: 'For people with color blindness, distinguishing between red and green is often difficult.',
    portugueseExample: 'Para pessoas com daltonismo, distinguir entre o vermelho e o verde é frequentemente difícil.',
  }
];

// Main App component
const App = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to toggle the visibility of the example sentences.
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Filter words based on the search query
  const filteredWords = wordData.filter(word =>
    word.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.portuguese.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-4 font-sans antialiased flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto my-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-800 dark:text-indigo-400 mb-6 drop-shadow-md">
          Vocabulário de Alemão
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-10">
          Uma lista interativa de palavras em alemão com traduções em inglês e português.
        </p>

        {/* Search bar component */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Pesquisar por palavras em alemão, inglês ou português..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Table container with Tailwind styling */}
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden">
          <div className="hidden lg:grid grid-cols-6 gap-4 p-4 text-sm sm:text-base font-semibold uppercase text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700">
            <div className="col-span-2">Alemão</div>
            <div className="col-span-2">Inglês</div>
            <div className="col-span-2">Português</div>
          </div>

          {filteredWords.map((word, index) => (
            <div key={index} className="border-t border-gray-200 dark:border-gray-700">
              {/* Main word display row */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 p-4 items-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors duration-200"
                onClick={() => toggleRow(index)}
              >
                {/* German Word */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 font-bold text-lg text-indigo-700 dark:text-indigo-300">
                  {word.german}
                </div>

                {/* English Translation */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 text-gray-800 dark:text-gray-200">
                  <span className="sm:hidden font-semibold text-gray-500 dark:text-gray-400">Inglês: </span>
                  {word.english}
                </div>

                {/* Portuguese Translation */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 text-gray-800 dark:text-gray-200">
                  <span className="sm:hidden font-semibold text-gray-500 dark:text-gray-400">Português: </span>
                  {word.portuguese}
                </div>
              </div>

              {/* Collapsible example sentences row */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  expandedRow === index ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 p-0'
                } bg-gray-50 dark:bg-gray-700`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-200 border-l-4 border-indigo-500 pl-4">
                  <div>
                    <h4 className="font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 mb-1">Exemplo em Alemão</h4>
                    <p className="italic">"{word.germanExample}"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 mb-1">Exemplo em Inglês</h4>
                    <p className="italic">"{word.englishExample}"</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm uppercase text-indigo-600 dark:text-indigo-400 mb-1">Exemplo em Português</h4>
                    <p className="italic">"{word.portugueseExample}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
