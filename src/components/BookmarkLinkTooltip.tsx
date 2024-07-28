import { PropsWithChildren } from 'react';
import { TooltipContentProps } from '@radix-ui/react-tooltip';

import CopyButton from './CopyButton';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const BookmarkLinkTooltip = (props: PropsWithChildren<{ name: string; side: TooltipContentProps['side']; copy?: boolean }>) => {
  const { children, name, side, copy } = props;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align="start" className="flex items-center">
        {copy && <CopyButton text={name} />}
        {name}
      </TooltipContent>
    </Tooltip>
  );
};
export default BookmarkLinkTooltip;
