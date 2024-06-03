import React from "react";
import { useEffect } from "react";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


function CommentWithLinks({ comment }) {

    function filterText(text) {
        let urlPattern = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlPattern, '[$&]($&)');
    }
    return (
        <>
            {comment.data.author && comment.data.body && (
                <>
                    <h4 className='post1-comment-author nunito-sans'>u/{comment.data.author}: </h4>
                    <h4 className='post1-comment-text nunito-sans'>
                        <ReactMarkdown remarkPlugins={[remarkGfm]} className='break'>
                            {comment.data.body}
                        </ReactMarkdown>
                    </h4>
                </>
            )}
        </>
    )
}

export default CommentWithLinks
 