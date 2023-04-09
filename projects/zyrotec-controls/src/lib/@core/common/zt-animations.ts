import { transition, trigger, style, query, animate, AnimationMetadata, group, AnimationQueryMetadata, AnimationGroupMetadata } from '@angular/animations';

const slideAnimationDuration = 0.5

export const slideInOutLeft: (AnimationQueryMetadata | AnimationGroupMetadata)[] = [
    query(':enter, :leave', style(
        {
            position: 'relative',
            width: '100%'
        }
    ),
        {
            optional: true
        }
    ),
    group(
        [
            query(':enter', [
                style(
                    {
                        transform: 'translateX(-100%)',
                        opacity: 0
                    }
                ),
                animate(`${slideAnimationDuration}s ease-out`, style(
                    {
                        transform: 'translateX(0%)',
                        opacity: 1
                    }
                ))
            ], {
                optional: true
            }),
            query(':leave', [
                style(
                    {
                        transform: 'translateX(0%)',
                        opacity: 1
                    }
                ),
                animate(`${slideAnimationDuration}s ease-out`, style(
                    {
                        transform: 'translateX(100%)',
                        opacity: 0
                    }
                ))
            ], {
                optional: true
            })
        ]
    )
];

export const slideInOutRight: (AnimationQueryMetadata | AnimationGroupMetadata)[] = [
    query(':enter, :leave', style(
        {
            position: 'relative',
            width: '100%'
        }
    ),
        {
            optional: true
        }
    ),
    group(
        [
            query(':enter', [
                style(
                    {
                        transform: 'translateX(100%)',
                        opacity: 0
                    }
                ),
                animate(`${slideAnimationDuration}s ease-out`, style(
                    {
                        transform: 'translateX(0%)',
                        opacity: 1
                    }
                ))
            ], {
                optional: true
            }),
            query(':leave', [
                style(
                    {
                        transform: 'translateX(0%)',
                        opacity: 1
                    }
                ),
                animate(`${slideAnimationDuration}s ease-out`, style(
                    {
                        transform: 'translateX(-100%)',
                        opacity: 0
                    }
                ))
            ], {
                optional: true
            })
        ]
    )
];