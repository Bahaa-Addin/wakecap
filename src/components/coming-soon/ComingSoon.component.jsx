import React from "react";

import bubblesImage from '../../assets/images/gradient-bubbles.jpeg';

import scss from './ComingSoon.module.scss';

const ComingSoon = () => (
  <div className={scss["wrapper"]}>
    <div className={scss["container"]}>
      <img src={bubblesImage} alt="Coming Soon" className={scss["avatar"]}
           width="250" draggable="false"/>

      <div className={scss["text"]}>
        <h1>Building…</h1>
        <p title="(I guess)">(coming soon)</p>
      </div>
    </div>
  </div>
);

export {ComingSoon};
