import './styles/main.scss';
import Elm from '../elm/Main';

const init = `module FizzBuzz exposing (fizzbuzz)

import List exposing (map, range)


{-| Fizzes the buzzes, and buzzfizzes the fizz out of buzz
fizzbuzz 1 7 == "1 2 Fizz 4 Buzz Fizz 7"
-}
fizzbuzz : Int -> Int -> String
fizzbuzz from to =
    let
        fizzBuzz n =
            case ( n % 3, n % 5 ) of
                ( 0, 0 ) ->
                    "FizzBuzz"

                ( 0, _ ) ->
                    "Fizz"

                ( _, 0 ) ->
                    "Buzz"

                _ ->
                    toString n
    in
        List.range from to
            |> map (fizzBuzz >> toString)
            |> joinWords


joinWords : List String -> String
joinWords a =
    String.join " " a`;

const app = Elm.Main.embed(document.getElementById('root'), init);

const codeMirror = CodeMirror(document.getElementById('code-editor'), {
  value: init,
  lineNumbers: true,
  mode: 'elm',
  theme: 'one-dark'
});

codeMirror.setSize('100%', '100%');

codeMirror.on('change', (cm, change) =>
  app.ports.updateInput.send(cm.getValue())
);

window.onerror = (errorMsg, url, lineNumber) => {
  setTimeout(() => {
    const split = errorMsg.split('The message provided by the code author is:');
    if (split.length == 2) {
      document.getElementById('error-dialog').innerText = split[1];
    }
  }, 30);
  return false;
};

window.onkeydown = () => {
  document.getElementById('error-dialog').innerText = '';
};
