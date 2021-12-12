import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMAGE_BASE_URL } from "../../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies([response.results]);
        setMainMovieImage(response.results[0]);
      });
  }, []);

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
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
