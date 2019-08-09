# IamIP - Recruitment exercise
## RECRUITMENT EXERCISE

### How to run application:
   - clone repository
   - run _npm install_ command in terminal
   - when all dependencies are installed run _npm start_ in terminal
   - open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Exercise objectives:
#### Exercise purpose:
  - download and display data provided by opensource API,
  - to create application use JavaScript (ES6+) and React & Redux libraries,
  - downloaded data and new user's data should be saved in Redux store.
#### Expected results:
  1. List of posts available at [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts "JSONPlaceholder. Fake Online REST API for Testing and Prototyping") should be displayed after opening application in the browser. Only _title_ & _body_ should be displayed. _UserId_ and _id_ can be omitted.
  2. Under each post add "View comments" button. Clicking it should trigger downloading post's comments and display them under the post (no page reaload). Comments can be downloaded from [https://jsonplaceholder.typicode.com/comments?postId={#post_id}](https://jsonplaceholder.typicode.com/comments "JSONPlaceholder. Fake Online REST API for Testing and Prototyping").
  3. Under comments' list add simple form allowing to add new comment and "Add comment" button. Clicking form's button should add new comment to the comments list and clear input text field.
  4. New comment can be saved to Redux store.
  5. Form fields are: "name", "email" & "body". Add random "id" field.
#### Additional requirements:
 - add posts' list pagination - switching between pages with no webpage reload in the browser,
 - each post can be checked and unchecked as "favourite",
 - add filters (search tool) for posts:

    - search in _title_ and _body_ fields (options: title, body & both),
    - search by post _author_ (name field) - possibility to select multiple authors at once; API does not return authors, so you can create your own (name & surname) and add it to ids received from API,
    - "display only favourites" option,
    - each filter is optional; If there are multiple filters selected (e.g. by author & favourites), then we should receive favourite posts by searched author (AND operator).

  - sorting posts functionality - by _title_ & by _date_ (by _id_) - both options in ascending & descending orders, "favourite posts" on top / bottom of the list.
#### Non-functional requirements:
  - use Immutable library,
  - use Redux-saga middleware,
  - application code should be shared as public repository at [GitHub](https://github.com "GitHub"),
  - link to repository should be sent via e-mail,
  - application UI is not subject to evaluation, only basic readability is required,
  - files and folders structure matters, application development in the future should be assumed,
  - use of react-create-app is recommended,
  - all comments to the project should be included in README.md file.

### App description
   - application ReactJS set up using _create-react-app_ boilerplate,
   - in the project are used Redux & Redux-Saga libraries,
   - for project purposes there are used free APIs:

      - [JSONPlaceholder](https://jsonplaceholder.typicode.com "JSONPlaceholder. Fake Online REST API for Testing and Prototyping") including posts and comments,
      - [Random User Generator](https://randomuser.me/ "Random User Generator") generating random user data,

   - functionalities included in the application:

      - searching in following sections _title_, _body_ (post content) & _name_ (post's author),
      - displaying only favourite posts,
      - sorting posts' list by post's _title_ & _id_ - in ascending and descending order; there is added __id__ field to the post section due to easier sorting work tracking,
      - including and excluding posts from favourites,
      - displaying comments under the post,
      - adding new comments under the post,
      - posts' list pagination.

### Application operation has been tested on operating systems:
#### Ubuntu 18.04.1 LTS 64-bit:
      - Google Chrome version 70.0.3538.77 (Official Build) (64-bit),
      - Mozilla Firefox for Ubuntu version 63.0.3 (64-bit).
#### Windows 8.1 Pro 64-bit:
      - Google Chrome version 76.0.3809.100 (Official Build) (64-bit),
      - Mozilla Firefox version 68.0.1 (64-bit).
----

## ZADANIE REKRUTACYJNE

### Jak uruchomić aplikację:
   - sklonuj repozytorium
   - uruchom komendę _npm install_ w terminalu
   - kiedy już wszystkie zależności zostaną zainstalowane uruchom w terminalu komendę _npm start_
   - otwórz [http://localhost:3000](http://localhost:3000) aby zobaczyć aplikację w przeglądarce.

### Zadania do wykonania:
#### Cel zadania:
  - celem zadania jest pobranie i przedstawienie danych udostępnionych poprzez ogólnodostępne API,
  - aplikacja powinna być napisana w JavaScript (ES6+) oraz wykorzystywać bibioteki React oraz Redux,
  - Pobrane dane oraz dane utworzone przez użytkownika zapisujemy w Reduxowym storze.
#### Oczekiwany rezultat:
  1. Po otwarciu strony w przeglądarce powinna wyświetlić się lista postów dostępna pod adresem: [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts "JSONPlaceholder. Fake Online REST API for Testing and Prototyping"). Wyświetlamy tylko _title_ oraz _body_. _UserId_ oraz _id_ pomijamy.
  2. Pod każdym postem dodajemy przycisk "Pokaż komentarze". Jego wciśnięcie ma spowodować pobranie komentarzy do danego posta i wyświetlenie ich pod postem (bez przeładowania strony). Komentarze do posta pobieramy z adresu: [https://jsonplaceholder.typicode.com/comments?postId={#post_id}](https://jsonplaceholder.typicode.com/comments "JSONPlaceholder. Fake Online REST API for Testing and Prototyping")
  3. Pod listą komentarzy ma pojawić się prosty formularz dający możliwość dodania własnego komentarza oraz przycisk "Dodaj komentarz". Po wciśnięciu przycisku formularz ma być wyczyszczony a do listy komentarzy ma zostać dodany nowy komentarz.
4. Nowy komentarz zapisujemy tylko w reduxowym storze.
5. Pola formularza to "name", "email" i "body". "id" nadajemy losowy
#### Wymagania dodatkowe:
  - do listy postów dodać paginację (podział np. po 10 postów, lista stron [1 2 3 4...]) - przełączanie stron bez przeładowywania strony w przeglądarce,
  - każdy post możemy oznaczyć i odznaczyć jako „ulubiony”,
  - dodać filtr (wyszukiwarkę) postów:

    - szukanie w _title_ i _treści_ posta (opcje: tylko title, tylko body, title i body),
    - szukanie po _autorach_ postów – możliwość wybrania kilku autorów jednocześnie. Api nie zwraca nazw autorów więc należy stworzyć jakieś własne (imię i nazwisko) i przypisać je do id zwracanych z api,
    - opcja „pokaż tylko ulubione”,
    - każdy z filtrów jest opcjonalny. Jeśli wybranych jest kilka filtrów (np. wg autorów i ulubionych”), to szukamy ulubionych postów tego autora (operator AND).

  - dodanie możliwości sortowania postów – po tytule, po „ostatnie” (wg id) – obie opcje rosnąco i malejąco, „ulubione na górze/na dole”.
#### Wymagania niefunkcjonalne:
  - zastosowanie biblioteki Immutable,
  - zastosowanie redux-saga,
  - kod aplikacji udostępniony jako publiczne repozytorium w GitHubie (github.com),
  - link do repozytorium należy przesłać e-mailem,
  - wygląd aplikacji nie będzie oceniany, wymagana jedynie podstawowa czytelność,
  - struktura folderów i plików ma znaczenie, należy założyć możliwość rozbudowy aplikacji w przyszłości,
  - zalecamy wykorzystanie react-create-app,
  - wszelkie uwagi do przygotowanego projektu należy umieścić w pliku README.md.

### Opis aplikacji
   - aplikacja ReactJS utworzona przy użyciu _create-react-app_ boilerplate
   - zastsowane zostały biblioteki Redux i Redux-Saga,
   - do wykonania projektu zastosowane zostały darmowe API:

      - [JSONPlaceholder](https://jsonplaceholder.typicode.com "JSONPlaceholder. Fake Online REST API for Testing and Prototyping") zawierające posty i komentarze,
      - [Random User Generator](https://randomuser.me/ "Random User Generator") generujące dane losowych użytkowników,

   - zawarte w aplikacji funkcjonalności:

      - wyszukiwanie w sekcjach _title_, _body_ (treść posta) oraz _name_ (autor posta),
      - wyświetlanie tylko ulubionych postów,
      - sortowanie listy postów wg. _tytułu_ postu oraz _id_ - rosnąco / malejąco; do sekcji posta dodane zostało pole __id__, żeby móc łatwiej śledzić działanie sortowania,
      - dodawanie i usuwanie postów z ulubionych,
      - wyświetlanie komentarzy pod danym postem,
      - dodawanie komentarzy pod postem,
      - paginacja listy postów.

### Działanie aplikacji zostało sprawdzone na systemach:
#### Ubuntu 18.04.2 LTS:
      - Google Chrome wersja 70.0.3538.77 (Oficjalna wersja) (64-bit),
      - Mozilla Firefox wersja 68.0.1 (64-bit).
#### Windows 8.1 Pro 64-bit:
      - Google Chrome wersja 76.0.3809.100 (Oficjalna wersja) (64-bit),
      - Mozilla Firefox wersja 68.0.1 (64-bit).