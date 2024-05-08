import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, FormInput, Row,} from 'shards-react';
import LoadingComponent from "#c/components/components-overview/LoadingComponent";

import {
  enableAdmin,
  enableAgent,
  enableSell,
  fetchCats,
  getEntitiesWithCount,
  getEntity,
  getPosts,
  getPostsByCat,
  isClient,
  loadPosts,
  loadProducts,
  postPath,
  SaveData,
  setCountry
} from "#c/functions/index";
import {ProductsSliderServer} from "#c/components/components-overview/ProductsSlider";
import {PostSliderServer} from "#c/components/components-overview/PostSlider";
import {withTranslation} from "react-i18next";
import _ from "underscore";
import {useSelector} from "react-redux";

const getURIParts = (url) => {
  var loc = new URL(url)
  return loc
}

const Counterold = (props) => {
  console.log('Counter...', props)
  let navigate = useNavigate();
  let [dis, setDis] = useState('');
  let [cap, setCaptch] = useState('');

  const [tracks, settracks] = useState("");
  const [cats, setcats] = useState([]);
  const [counts, setcount] = useState(0);
  const [theload, settheload] = useState(false);
  const [theload2, settheload2] = useState(false);
  let {match, location, history, t, url} = props;
  let {element = {}, params = {}} = props;
  let {data = {}, settings = {}} = element;
  let {general = {}} = settings;
  let {fields = {}} = general;
  let {entity = '', customQuery, populateQuery} = fields;
  let mainParams = useParams();
  // let params = data;
  if (!params.offset) {
    params.offset = 0
  }
  if (!params.limit) {
    params.limit = 24
  }
  url = isClient ? new URL(window.location.href) : "";


  // useEffect(() => {
  //   console.log("params.offset");
  //   loadProductItems(0);
  // }, [params.offset]);

  useEffect(() => {
    console.log("params._id");

  }, []);
  //


  return (<div className="main-conter">
    </div>
  );
};

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};
const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};
const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="countdown-link"
      >
        <DateTimeDisplay value={days} type={'روز'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'ساعت'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'دقیقه'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'ثانیه'} isDanger={false} />
      </a>
    </div>
  );
};
const Counter = ({ targetDate }) => {
  const THREE_DAYS_IN_MS = 10 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  targetDate=dateTimeAfterThreeDays;
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return '';
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export const HomeServer = [];
export default withTranslation()(Counter);
