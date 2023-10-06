import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "d4b9e1cb";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");
  const [selectedID, setSelectedID] = useState(null);
  // const [watched, setWatched] = useState([]);
  // useState hook也可以接收一个function的结果来作为它的initial value
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  // const [count, setCount] = useState(() => localStorage.getItem("items"))
  // 和
  // const [count, setCount] = useState(localStorage.getItem("items"))
  // 的比较
  // 第一个useState中用了一个callback function，那么这个function只有在application first mount的时候被渲染
  // 但是第二个useState中没有使用callback function，所以每次组建被渲染的时候都会去读取localStorage的内容，这是不必要的

  function handleSelectMovie(id) {
    return setSelectedID((setSelectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    return setSelectedID(null);
  }

  function handleWatchedMovie(movie) {
    return setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleModifyMovie(updatedMovie) {
    return setWatched((watched) =>
      watched.map((movie) =>
        movie.imdbID === updatedMovie.imdbID ? updatedMovie : movie
      )
    );
  }

  function handleDeleteWatched(id) {
    return setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(
    function () {
      // localStorage只能存储一些key : value的pair，所以需要在创建时定义他们的key和value
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
          );

          if (!res.ok) throw new Error("Something wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleWatchedMovie}
              watched={watched}
              onModify={handleModifyMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDelete={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  //让focus在每次页面被渲染的时候保持在search bar
  //但是这种做法不是很好，因为使用react框架是为了避免在选择DOM的时候使用document.querySelector
  //这里更好的方法是使用useRef()
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);

  const inputEl = useRef(null); //一般在处理DOM的时候可以选择为null
  useEffect(function () {
    function callback(e) {
      //如果当前激活的内容和inputEL当先选中的一样，那么直接结束逻辑，什么也不做，这个情况即选中search bar的情况下去focus search bar
      if (document.activeElement === inputEl.current) {
        return;
      }
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, []);

  // useRef: useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传递给它的参数（null 在这里）。返回的对象在组件的整个生命周期内保持不变。
  // useEffect: useEffect 可以让你执行副作用操作。当你传递一个空的依赖数组 [] 时，它只会在组件初次渲染后执行一次。

  // const inputEl = useRef(null); 创建了一个 ref 对象，其 .current 属性被初始化为 null。这是一个常见的模式，首先将 ref 初始化为 null，然后将其附加到某个 DOM 元素上。
  // inputEl.current.focus(); 这行代码的作用是将焦点设置到 input 元素上。当你的组件首次渲染后，由于 useEffect 的空依赖数组，这段代码会执行，从而自动将焦点放在 input 上。
  // ref={inputEl}: 这里，你将 inputEl ref 附加到 input DOM 元素上。这意味着，在此之后，你可以通过 inputEl.current 访问实际的 input DOM 节点，并对其进行操作（例如设置焦点）。
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl} //这个的作用是让useRef附加在input中
    />
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
function WatchedList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovieList
          movie={movie}
          key={movie.imdbID}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

function MovieDetails({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
  onModify,
}) {
  const [movie, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  //when userRating change, re-render this part
  useEffect(
    function () {
      //check if userRating exist，否则useEffect会在application first mount的时候render,所以这个countRef会从1开始
      if (userRating) {
        countRef.current++;
      }
    },
    [userRating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  console.log(isWatched);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  // 这个会报错，因为react hooks仅可以在top level中被调用，不能在condition中被调用
  // if (StarRating > 8) {
  //   const [isTop, setIsTop] = useState(true);
  // }

  // 这个是early return的情况，这个可能导致之后的react hook没有被成功render，比如下面的useEffect在这个情况下就不会被render
  // if (StarRating > 8) {
  //   return <p>grestest ever!</p>;
  // }

  //这个会返回false，即便选择的imdbRating是大于8的，因为在useState中，这个判断是initial state，仅在application first mount的时候被判断，application在first mount的时候imdbRating是undefined，所以结果是false
  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);
  //要解决这个问题可以用useEffect，在dependency中设置re-render的条件
  // useEffect(function(){
  //   setIsTop(imdbRating > 8)
  // },[imdbRating])
  //这样，每次imdbRating变化的时候，useEffect都会被触发，然后call setIsTop来update最新的imdbRating来判断

  function handleAdd() {
    const newWatchedMovie = {
      imdbRating: Number(imdbRating),
      imdbID: selectedID,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecision: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie(null);
  }

  function handleModify() {
    const updatedWatchedMovie = {
      imdbRating: Number(imdbRating),
      imdbID: selectedID,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onModify(updatedWatchedMovie);
    onCloseMovie(null);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        const data = await res.json();
        setMovies(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = `usePopcorn`;
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie} movie`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull: {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <>
                      <p>
                        Your most recently rating for this movie is:
                        {watchedUserRating}
                      </p>
                      <button className="btn-add" onClick={handleModify}>
                        Modify
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedMovieList({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.Title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
}
