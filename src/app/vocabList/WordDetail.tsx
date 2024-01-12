import React from "react";

interface definitionAndExample {
  definition: string;
  example: string | null;
}

const WordDetail = ({
  definitionAndExample,
  detailRef,
}: {
  definitionAndExample: definitionAndExample[];
  detailRef: React.Ref<HTMLDetailsElement>;
}) => {
  return (
    <div className={"w-full px-2.4"}>
      <details
        ref={detailRef}
        id={"row2"}
        className={`flex flex-col w-full max-h-[48rem] overflow-auto`}
      >
        <summary className={"text-transparent h-0"}></summary>
        {
          <ol
            className={
              "list-decimal flex flex-col mt-0.8 mb-2.4 mx-1.2 gap-1.2"
            }
          >
            {definitionAndExample.map((item, index) => (
              <li
                key={crypto.randomUUID()}
                className={`flex gap-0.4 w-[62rem] text-[1.6rem] text-Gr-700 leading-[2rem] font-din font-semibold`}
              >
                {index + 1}.
                <div className={"flex-col gap-0.6"}>
                  {`${item.definition}`}
                  <p
                    key={crypto.randomUUID()}
                    className={
                      "text-Gr-500 text-[1.4rem] font-din font-normal leading-8"
                    }
                  >
                    {`  ${item.example}`}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        }
      </details>
    </div>
  );
};

export default WordDetail;

//あさとです。
