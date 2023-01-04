import React from 'react';

export type Props = {
  children: React.ReactNode;
  title: string;
};

const ContentBlock: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col p-12">
      <h2 className="font-bold text-3xl">{props.title}</h2>
      {props.children}
    </div>
  );
};

export default ContentBlock;
