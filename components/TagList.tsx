import React from 'react';

type TagListProps = {
  tags: string[];
};

const TagList: React.FC<TagListProps> = ({ tags }) => (
  <div>
    <strong>Tags:</strong> {tags.map(tag => <span key={tag}>#{tag} </span>)}
  </div>
);

export default TagList;