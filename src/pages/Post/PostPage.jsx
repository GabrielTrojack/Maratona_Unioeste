import React from "react";
import "./PostPage.css";
import prop from "../../assets/prop.jpg";


const Post = () => {
  return (
  <div className="post-page">
    <div className="post-content">

      <h1>Como a maratona unioeste se saiu na fase sub-regional</h1>

      <div className="info">
        <div className="span">
          <span className="tag">Competição</span>
        </div>
        <p className="date">31 de Julho de 2025</p>
      </div>

      <div className="cover">
        <img src={prop} className="imagecover" />
      </div>

      <p style={{ whiteSpace: "pre-wrap" }} className="post">Lorem ipsum dolor sit amet. Et ullam sint a laudantium consequuntur ut voluptate harum quo suscipit cupiditate qui iure libero? Et corporis culpa qui expedita eaque hic consectetur expedita.
        Ut eaque itaque ut distinctio rerum ab blanditiis quas vel nihil amet et repellat doloribus hic esse beatae hic corporis sapiente. Et necessitatibus nihil et porro architecto non facere necessitatibus hic Quis nulla eum enim internos et incidunt consequuntur quo necessitatibus culpa.

        Ab sequi alias aut voluptas sequi aut velit minima qui sint autem et repudiandae veritatis. Eos animi tenetur qui perspiciatis iste et ipsam eligendi hic illum magni et voluptate nesciunt eos quia ipsum. Sit tenetur expedita non eligendi optio qui reiciendis dolore qui illo officiis eos sapiente dolores qui expedita reprehenderit non cupiditate repellendus.

        Lorem ipsum dolor sit amet. Et ullam sint a laudantium consequuntur ut voluptate harum quo suscipit cupiditate qui iure libero? Et corporis culpa qui expedita eaque hic consectetur expedita.
        Ut eaque itaque ut distinctio rerum ab blanditiis quas vel nihil amet et repellat doloribus hic esse beatae hic corporis sapiente. Et necessitatibus nihil et porro architecto non facere necessitatibus hic Quis nulla eum enim internos et incidunt consequuntur quo necessitatibus culpa.
      </p>


    </div>
  </div>
  );
};

export default Post;
