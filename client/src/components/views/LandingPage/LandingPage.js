import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import MainImage from "./Sections/MainImage";
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endPoint);
  }, []);

  const loadMoreItems = () => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endPoint);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {/* Main Image */}
      {/* 렌더링이 먼저 되기 때문에 state에 MainMovieImage가 없는 상태, 이를 처리하기 위해
          MainMovieImage가 있으면(&&)이를 처리하라는 코드를 작성해주어야 한다.*/}
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h2>최신 영화 목록</h2>
        <hr />
        {/* Movie Grid Cards */}
        <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={loadMoreItems}>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
