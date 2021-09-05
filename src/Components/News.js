import React, { useEffect,useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>  {

const [articles, setArticles] = useState([])
const [loading, setloading] = useState(true)
const [page, setpage] = useState(1)
const [totalResults, settotalResults] = useState(0)


const  capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };




  const updateNews= async ()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e9492186e31743d099dd70a7d55bed28&page=${page}&pageSize=${props.pageSize}`;
    setloading( true);

    let data = await fetch(url);
    let parseData = await data.json();
    
    setArticles(parseData.articles);
    settotalResults(parseData.totalResults);
    setloading(false);

    
  }


  useEffect(() => {
    document.title = `${capitalFirstLetter(props.category)}- NewsApp`;
    updateNews();
    
  }, [])

  


  // api key e9492186e31743d099dd70a7d55bed28
  

  const fetchMoreData =  async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e9492186e31743d099dd70a7d55bed28&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page + 1)
    

    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);

    setArticles(articles.concat(parseData.articles))
    settotalResults(parseData.totalResults)

  };


    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px", marginTop: '90px' }}>
          NewToday - Top Headline from{" "}
          {capitalFirstLetter(props.category)}
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  
}


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};


export default News;
